export function liveSnapshotErrorMessage(err: any): string {
	const status = Number(err?.status);
	if (status === 401) return 'Session expired, please sign in again.';
	if (status === 417) return 'Cannot get live image. Reload the page and try again.';
	if (status === 400) return 'Camera or NVR did not return an image.';
	if (status === 404) return 'Live API is not available on the server.';
	return 'Cannot get live image.';
}

export function isLiveCameraSwitch(prevCameraId: number | null | undefined, nextCameraId: number | null | undefined): boolean {
	return prevCameraId !== nextCameraId;
}

export function isStaleLiveSnapshot(
	requestSeq: number,
	currentSeq: number,
	requestCameraId: number,
	selectedCameraId: number | null | undefined
): boolean {
	return requestSeq !== currentSeq || selectedCameraId !== requestCameraId;
}

export function isFatalLiveStatus(status: number): boolean {
	return status === 401 || status === 404 || status === 417;
}

/** Empty/unsupported MJPEG → fall back to snapshot polling. */
export function shouldFallbackToSnapshot(status: number): boolean {
	return status === 404 || status === 204 || status === 400;
}

export function concatBytes(a: Uint8Array, b: Uint8Array): Uint8Array {
	if (!a.length) return b;
	if (!b.length) return a;
	const out = new Uint8Array(a.length + b.length);
	out.set(a, 0);
	out.set(b, a.length);
	return out;
}

const MAX_LIVE_BUFFER = 8 * 1024 * 1024;

export function isValidJpegFrame(frame: Uint8Array): boolean {
	if (!frame || frame.length < 4) return false;
	if (frame[0] !== 0xff || frame[1] !== 0xd8) return false;
	if (frame[frame.length - 2] !== 0xff || frame[frame.length - 1] !== 0xd9) return false;
	// Reject H.264 NAL-looking payloads that only wrap SOI/EOI.
	return frame[2] === 0xff;
}

export function extractJpegFrames(buffer: Uint8Array): { frames: Uint8Array[]; rest: Uint8Array } {
	const frames: Uint8Array[] = [];
	let i = 0;
	while (i < buffer.length - 1) {
		if (buffer[i] !== 0xff || buffer[i + 1] !== 0xd8) {
			i++;
			continue;
		}
		let end = -1;
		for (let j = i + 2; j < buffer.length - 1; j++) {
			if (buffer[j] === 0xff && buffer[j + 1] === 0xd9) {
				end = j + 2;
				break;
			}
		}
		if (end < 0) return { frames, rest: buffer.subarray(i) };
		const frame = buffer.subarray(i, end);
		if (isValidJpegFrame(frame)) frames.push(frame);
		i = end;
	}
	const rest = i < buffer.length ? buffer.subarray(i) : new Uint8Array(0);
	if (rest.length > MAX_LIVE_BUFFER) return { frames, rest: rest.subarray(rest.length - MAX_LIVE_BUFFER) };
	return { frames, rest };
}

export type LiveMjpegHandlers = {
	url: string;
	headers: Record<string, string>;
	signal: AbortSignal;
	onFrame: (blobUrl: string) => void;
	onFatal: (err: any) => void;
};

export async function playMjpegStream(opts: LiveMjpegHandlers): Promise<void> {
	let buffer = new Uint8Array(0);
	let emptyRounds = 0;
	while (!opts.signal.aborted) {
		try {
			const res = await fetch(opts.url, { headers: opts.headers, signal: opts.signal, cache: 'no-store' });
			const status = Number(res.status);
			if (!res.ok || !res.body) {
				if (shouldFallbackToSnapshot(status) || isFatalLiveStatus(status)) {
					opts.onFatal({ status });
					return;
				}
				await delayLive(800, opts.signal);
				continue;
			}
			const reader = res.body.getReader();
			let gotFrame = false;
			for (;;) {
				const { done, value } = await reader.read();
				if (done) break;
				buffer = concatBytes(buffer, value);
				const parsed = extractJpegFrames(buffer);
				buffer = parsed.rest;
				for (const frame of parsed.frames) {
					gotFrame = true;
					emptyRounds = 0;
					const copy = new Uint8Array(frame.byteLength);
					copy.set(frame);
					opts.onFrame(URL.createObjectURL(new Blob([copy], { type: 'image/jpeg' })));
				}
			}
			if (!gotFrame) {
				emptyRounds++;
				if (emptyRounds >= 2) {
					opts.onFatal({ status: 204 });
					return;
				}
			}
			await delayLive(400, opts.signal);
		} catch (err: any) {
			if (opts.signal.aborted) return;
			const status = Number(err?.status);
			if (shouldFallbackToSnapshot(status) || isFatalLiveStatus(status)) {
				opts.onFatal(err?.status != null ? err : { status, message: err?.message });
				return;
			}
			await delayLive(1000, opts.signal);
		}
	}
}

function delayLive(ms: number, signal: AbortSignal): Promise<void> {
	if (signal.aborted) return Promise.resolve();
	return new Promise((resolve) => {
		const t = setTimeout(resolve, ms);
		signal.addEventListener(
			'abort',
			() => {
				clearTimeout(t);
				resolve();
			},
			{ once: true }
		);
	});
}
