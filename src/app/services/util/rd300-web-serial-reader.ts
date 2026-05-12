type Rd300Status = (message: string) => void;

export type Rd300TagType = 'ntag215' | 'desfire-ev3';
export type Rd300UidSource = 'static-uid' | 'unknown';

interface SerialPortLike {
	readable: ReadableStream<Uint8Array> | null;
	writable: WritableStream<Uint8Array> | null;
	open(options: { baudRate: number; dataBits?: number; stopBits?: number; parity?: 'none' | 'even' | 'odd'; flowControl?: 'none' | 'hardware' }): Promise<void>;
	close(): Promise<void>;
}

interface SerialNavigatorLike extends Navigator {
	serial?: {
		requestPort(): Promise<SerialPortLike>;
		getPorts?: () => Promise<SerialPortLike[]>;
	};
}

interface Rd300Response {
	command: number;
	status: number;
	data: number[];
}

export interface Rd300DetectedTag {
	uid: string;
	tagType: Rd300TagType;
	uidSource: Rd300UidSource;
}

export interface Rd300NdefRecord {
	type: string;
	payload: string | number[];
	rawPayload: number[];
}

export interface Rd300NdefReadResult extends Rd300DetectedTag {
	rawValue?: string;
	ndefMessage: number[];
	records: Rd300NdefRecord[];
}

export class Rd300WebSerialReader {
	private readonly stx = 0x02;
	private readonly successStatus = 0x00;
	private readonly textDecoder = new TextDecoder();
	private port?: SerialPortLike;
	private reader?: ReadableStreamDefaultReader<Uint8Array>;
	private writer?: WritableStreamDefaultWriter<Uint8Array>;
	private pendingRead?: Promise<ReadableStreamReadResult<Uint8Array>>;
	private readBuffer: number[] = [];

	constructor(private onStatus?: Rd300Status) {}

	async connect(): Promise<void> {
		await this.ensureConnected();
	}

	async readNdefCard(options?: { timeoutMs?: number; stableReads?: number }): Promise<Rd300NdefReadResult> {
		await this.ensureConnected();
		this.readBuffer = [];

		this.report('Place an NFC card on the RD300 reader.');
		const tag = await this.waitForStableCard(options);
		this.report('Reading NFC data from RD300.');

		const ndefMessage = tag.tagType === 'desfire-ev3' ? await this.readDesfireType4Ndef() : await this.readNtagType2Ndef();
		const records = this.decodeNdefRecords(ndefMessage);
		const textRecord = records.find((record) => record.type === 'T' && typeof record.payload === 'string');

		return {
			...tag,
			rawValue: typeof textRecord?.payload === 'string' ? textRecord.payload : undefined,
			ndefMessage,
			records,
		};
	}

	async waitForStableCard(options?: { blockedUid?: string; timeoutMs?: number; stableReads?: number }): Promise<Rd300DetectedTag> {
		await this.ensureConnected();
		const timeoutMs = Math.max(options?.timeoutMs ?? 30000, 1000);
		const stableReads = Math.max(options?.stableReads ?? 2, 1);
		const blockedUid = this.normalizeUid(options?.blockedUid || '');
		const startedAt = Date.now();
		let lastTag: Rd300DetectedTag | null = null;
		let matchedReads = 0;
		let sawBlockedCard = false;

		while (Date.now() - startedAt < timeoutMs) {
			const tag = await this.tryDetectTagOnce();
			if (!tag) {
				lastTag = null;
				matchedReads = 0;
				await this.delay(250);
				continue;
			}

			if (blockedUid && this.normalizeUid(tag.uid) === blockedUid) {
				sawBlockedCard = true;
				this.report(`Card ${tag.uid} is blocked. Remove it and place another card.`);
				lastTag = null;
				matchedReads = 0;
				await this.delay(250);
				continue;
			}

			if (lastTag && lastTag.uid === tag.uid && lastTag.tagType === tag.tagType) {
				matchedReads++;
			} else {
				lastTag = tag;
				matchedReads = 1;
			}

			if (matchedReads >= stableReads) {
				this.report(`Detected ${tag.tagType === 'desfire-ev3' ? 'MIFARE DESFire EV3 / Type 4' : 'NTAG / Type 2'} card ${tag.uid}.`);
				return tag;
			}

			await this.delay(150);
		}

		if (sawBlockedCard && blockedUid) {
			throw new Error(`Card ${blockedUid} is still on the RD300 reader. Remove it and place another card.`);
		}

		throw new Error('No supported NFC card was detected. Supported cards: NTAG215 and preformatted MIFARE DESFire EV3 Type 4 tags.');
	}

	async disconnect(): Promise<void> {
		try {
			await this.reader?.cancel().catch(() => undefined);
			this.reader?.releaseLock();
		} catch {
			/* ignore close errors */
		}

		try {
			this.writer?.releaseLock();
		} catch {
			/* ignore close errors */
		}

		this.reader = undefined;
		this.writer = undefined;
		this.pendingRead = undefined;
		this.readBuffer = [];

		if (this.port) {
			await this.port.close().catch(() => undefined);
			this.port = undefined;
		}
	}

	private async ensureConnected(): Promise<void> {
		if (this.port && this.reader && this.writer) return;

		const serial = (navigator as SerialNavigatorLike).serial;
		if (!serial?.requestPort) {
			throw new Error('Web Serial is not supported by this browser. Use Chrome or Edge on HTTPS/localhost.');
		}

		this.port = await this.resolveSerialPort(serial);
		await this.port.open({
			baudRate: 9600,
			dataBits: 8,
			stopBits: 1,
			parity: 'none',
			flowControl: 'none',
		});

		if (!this.port.readable || !this.port.writable) {
			throw new Error('Cannot open the RD300 serial streams.');
		}

		this.reader = this.port.readable.getReader();
		this.writer = this.port.writable.getWriter();
		this.report('RD300 serial port is connected.');
	}

	private async resolveSerialPort(serial: NonNullable<SerialNavigatorLike['serial']>): Promise<SerialPortLike> {
		const grantedPorts = (await serial.getPorts?.().catch(() => [])) || [];
		const grantedPort = grantedPorts[0];
		if (grantedPort) {
			this.report('Reusing the previously selected RD300 serial port.');
			return grantedPort;
		}

		this.report('Select the RD300 serial port.');
		return await serial.requestPort();
	}

	private async tryDetectTagOnce(): Promise<Rd300DetectedTag | null> {
		const ntag = await this.tryReadNtagUid();
		if (ntag) return ntag;

		return await this.trySelectDesfire();
	}

	private async trySelectDesfire(): Promise<Rd300DetectedTag | null> {
		try {
			await this.sendCommand(0x30);
			const response = await this.sendCommand(0x31);
			if (response.data.length < 7) return null;

			return {
				uid: this.toHex(response.data.slice(0, 7)),
				tagType: 'desfire-ev3',
				uidSource: 'static-uid',
			};
		} catch {
			return null;
		}
	}

	private async tryReadNtagUid(): Promise<Rd300DetectedTag | null> {
		try {
			const block0 = await this.readNtagBlock(0);
			if (block0.length < 8) return null;

			return {
				uid: this.toHex([block0[0], block0[1], block0[2], block0[4], block0[5], block0[6], block0[7]]),
				tagType: 'ntag215',
				uidSource: 'static-uid',
			};
		} catch {
			return null;
		}
	}

	private async readNtagType2Ndef(): Promise<number[]> {
		const bytes: number[] = [];
		const startPage = 4;
		const maxPage = 129;

		for (let page = startPage; page <= maxPage; page += 4) {
			bytes.push(...(await this.readNtagBlock(page)));
			const ndefMessage = this.tryExtractType2Ndef(bytes);
			if (ndefMessage) return ndefMessage;
		}

		throw new Error('The NTAG card does not contain a readable NDEF message.');
	}

	private tryExtractType2Ndef(bytes: number[]): number[] | null {
		let index = 0;

		while (index < bytes.length) {
			const type = bytes[index++];
			if (type === undefined) return null;
			if (type === 0x00) continue;
			if (type === 0xfe) break;

			let length = bytes[index++];
			if (length === undefined) return null;

			if (length === 0xff) {
				if (index + 1 >= bytes.length) return null;
				length = (bytes[index] << 8) | bytes[index + 1];
				index += 2;
			}

			if (index + length > bytes.length) return null;
			if (type === 0x03) {
				if (!length) throw new Error('The NTAG card contains an empty NDEF message.');
				return bytes.slice(index, index + length);
			}

			index += length;
		}

		throw new Error('The NTAG card does not contain an NDEF TLV.');
	}

	private async readNtagBlock(blockNumber: number): Promise<number[]> {
		const response = await this.sendCommand(0x13, [0x00, 0x00, blockNumber & 0xff]);
		if (response.data.length < 16) {
			throw new Error('RD300 returned an invalid NTAG read response.');
		}
		return response.data.slice(0, 16);
	}

	private async readDesfireType4Ndef(): Promise<number[]> {
		this.report('Selecting DESFire NDEF application.');
		await this.expectApduSuccess(await this.sendDesfireApdu([0x00, 0xa4, 0x04, 0x00, 0x07, 0xd2, 0x76, 0x00, 0x00, 0x85, 0x01, 0x01, 0x00]), 'Cannot select DESFire NDEF application.');
		await this.expectApduSuccess(await this.sendDesfireApdu([0x00, 0xa4, 0x00, 0x0c, 0x02, 0xe1, 0x03]), 'Cannot select DESFire Capability Container file.');

		const ccResponse = await this.expectApduSuccess(await this.sendDesfireApdu([0x00, 0xb0, 0x00, 0x00, 0x0f]), 'Cannot read DESFire Capability Container file.');
		const ndefFile = this.parseType4CapabilityContainer(ccResponse);

		this.report('Reading DESFire NDEF file.');
		await this.expectApduSuccess(await this.sendDesfireApdu([0x00, 0xa4, 0x00, 0x0c, 0x02, ...ndefFile.fileId]), 'Cannot select DESFire NDEF file.');

		const nlenBytes = await this.readType4Binary(0, 2);
		const ndefLength = (nlenBytes[0] << 8) | nlenBytes[1];
		if (!ndefLength) {
			throw new Error('The DESFire card contains an empty NDEF message.');
		}
		if (ndefLength > ndefFile.maxSize) {
			throw new Error(`The DESFire NDEF length (${ndefLength} bytes) exceeds the file size (${ndefFile.maxSize} bytes).`);
		}

		return await this.readType4Binary(2, ndefLength);
	}

	private async readType4Binary(offset: number, length: number): Promise<number[]> {
		const output: number[] = [];
		let currentOffset = offset;
		let remaining = length;

		while (remaining > 0) {
			const chunkLength = Math.min(remaining, 0xff);
			const chunk = await this.expectApduSuccess(
				await this.sendDesfireApdu([0x00, 0xb0, (currentOffset >> 8) & 0xff, currentOffset & 0xff, chunkLength]),
				'Cannot read DESFire NDEF file.'
			);
			output.push(...chunk.slice(0, chunkLength));
			currentOffset += chunkLength;
			remaining -= chunkLength;
		}

		return output;
	}

	private async sendDesfireApdu(apdu: number[]): Promise<number[]> {
		const response = await this.sendCommand(0x32, apdu);
		return response.data;
	}

	private async expectApduSuccess(response: number[], errorMessage: string): Promise<number[]> {
		if (response.length < 2) {
			throw new Error(errorMessage);
		}

		const sw1 = response[response.length - 2];
		const sw2 = response[response.length - 1];
		if (sw1 !== 0x90 || sw2 !== 0x00) {
			throw new Error(`${errorMessage} APDU status: ${this.toHex([sw1, sw2])}.`);
		}

		return response.slice(0, -2);
	}

	private parseType4CapabilityContainer(cc: number[]): { fileId: number[]; maxSize: number } {
		const ndefFileControl = cc.findIndex((value, index) => index >= 7 && value === 0x04 && cc[index + 1] === 0x06);
		if (ndefFileControl < 0 || cc.length < ndefFileControl + 8) {
			throw new Error('The DESFire card is not formatted with a supported NDEF file control TLV.');
		}

		return {
			fileId: [cc[ndefFileControl + 2], cc[ndefFileControl + 3]],
			maxSize: (cc[ndefFileControl + 4] << 8) | cc[ndefFileControl + 5],
		};
	}

	private decodeNdefRecords(ndefMessage: number[]): Rd300NdefRecord[] {
		const records: Rd300NdefRecord[] = [];
		let index = 0;

		while (index < ndefMessage.length) {
			const header = ndefMessage[index++];
			if (header === undefined) break;

			const shortRecord = (header & 0x10) !== 0;
			const hasIdLength = (header & 0x08) !== 0;
			const typeLength = ndefMessage[index++];
			if (typeLength === undefined) break;

			let payloadLength = 0;
			if (shortRecord) {
				const length = ndefMessage[index++];
				if (length === undefined) break;
				payloadLength = length;
			} else {
				if (index + 3 >= ndefMessage.length) break;
				payloadLength = (ndefMessage[index] << 24) | (ndefMessage[index + 1] << 16) | (ndefMessage[index + 2] << 8) | ndefMessage[index + 3];
				index += 4;
			}

			const idLength = hasIdLength ? ndefMessage[index++] || 0 : 0;
			const typeBytes = ndefMessage.slice(index, index + typeLength);
			index += typeLength + idLength;

			const payloadBytes = ndefMessage.slice(index, index + payloadLength);
			index += payloadLength;

			const type = this.asciiFromBytes(typeBytes);
			records.push({
				type,
				payload: type === 'T' ? this.decodeTextRecordPayload(payloadBytes) : payloadBytes,
				rawPayload: payloadBytes,
			});

			if ((header & 0x40) !== 0) break;
		}

		if (!records.length) {
			throw new Error('The NFC card contains an invalid NDEF message.');
		}

		return records;
	}

	private decodeTextRecordPayload(payloadBytes: number[]): string {
		if (!payloadBytes.length) return '';

		const status = payloadBytes[0];
		const isUtf16 = (status & 0x80) !== 0;
		const languageCodeLength = status & 0x3f;
		const textBytes = payloadBytes.slice(1 + languageCodeLength);
		if (isUtf16) {
			return new TextDecoder('utf-16').decode(new Uint8Array(textBytes));
		}

		return this.textDecoder.decode(new Uint8Array(textBytes));
	}

	private async sendCommand(command: number, data: number[] = [], timeoutMs = 5000): Promise<Rd300Response> {
		if (!this.writer) {
			throw new Error('RD300 serial writer is not connected.');
		}

		const frame = new Uint8Array([this.stx, data.length + 1, command, ...data]);
		await this.writer.write(frame);
		const response = await this.readResponse(timeoutMs);
		if (response.command !== command) {
			throw new Error(`RD300 returned command ${this.toHex([response.command])} while waiting for ${this.toHex([command])}.`);
		}
		if (response.status !== this.successStatus) {
			throw new Error(this.resolveStatusMessage(response.status));
		}

		return response;
	}

	private async readResponse(timeoutMs: number): Promise<Rd300Response> {
		if (!this.reader) {
			throw new Error('RD300 serial reader is not connected.');
		}

		const startedAt = Date.now();
		while (Date.now() - startedAt < timeoutMs) {
			const parsed = this.tryParseResponse();
			if (parsed) return parsed;

			const readTimeout = Math.max(Math.min(timeoutMs - (Date.now() - startedAt), 250), 1);
			const chunk = await this.readChunkWithTimeout(readTimeout);
			if (chunk?.length) {
				this.readBuffer.push(...Array.from(chunk));
			}
		}

		throw new Error('Timed out while waiting for RD300 response.');
	}

	private tryParseResponse(): Rd300Response | null {
		while (this.readBuffer.length && this.readBuffer[0] !== this.stx) {
			this.readBuffer.shift();
		}

		if (this.readBuffer.length < 3) return null;
		const len = this.readBuffer[1];
		const frameLength = 2 + len;
		if (this.readBuffer.length < frameLength) return null;

		const frame = this.readBuffer.splice(0, frameLength);
		if (len < 2) {
			throw new Error('RD300 returned an invalid response frame.');
		}

		return {
			command: frame[2],
			status: frame[3],
			data: frame.slice(4),
		};
	}

	private async readChunkWithTimeout(timeoutMs: number): Promise<Uint8Array | null> {
		if (!this.reader) return null;
		if (!this.pendingRead) {
			this.pendingRead = this.reader.read().finally(() => {
				this.pendingRead = undefined;
			});
		}

		return await Promise.race([this.pendingRead.then((result) => result.value || null), new Promise<null>((resolve) => setTimeout(() => resolve(null), timeoutMs))]);
	}

	private resolveStatusMessage(status: number): string {
		if (status === 0x01) return 'No supported card was detected on the RD300 reader, or the card command failed.';
		if (status === 0x10) return 'RD300 command error.';
		return `RD300 command failed with status ${this.toHex([status])}.`;
	}

	private toHex(bytes: number[]): string {
		return bytes.map((byte) => byte.toString(16).padStart(2, '0')).join('').toUpperCase();
	}

	private asciiFromBytes(bytes: number[]): string {
		return String.fromCharCode(...bytes).replace(/\0/g, '').trim();
	}

	private report(message: string): void {
		this.onStatus?.(message);
	}

	private delay(ms: number): Promise<void> {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	private normalizeUid(uid: string): string {
		return `${uid || ''}`.trim().toUpperCase();
	}
}
