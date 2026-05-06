const fs = require('fs');
const path = require('path');

const root = process.cwd();

function readIfExists(filePath) {
	if (!fs.existsSync(filePath)) return null;
	return fs.readFileSync(filePath, 'utf8');
}

function writeIfChanged(filePath, nextContent) {
	const currentContent = readIfExists(filePath);
	if (currentContent === null) {
		console.log(`[postinstall] Skip NFC patch: file not found: ${filePath}`);
		return false;
	}

	if (currentContent === nextContent) return false;
	fs.writeFileSync(filePath, nextContent, 'utf8');
	return true;
}

function replaceInFile(filePath, replacements) {
	const currentContent = readIfExists(filePath);
	if (currentContent === null) {
		console.log(`[postinstall] Skip NFC patch: file not found: ${filePath}`);
		return false;
	}

	let nextContent = currentContent;
	let changed = false;

	for (const { from, to, label } of replacements) {
		if (!nextContent.includes(from)) {
			if (nextContent.includes(to)) continue;
			console.log(`[postinstall] Skip NFC patch (${label}): pattern not found in ${filePath}`);
			continue;
		}

		nextContent = nextContent.replace(from, to);
		changed = true;
	}

	if (changed) {
		fs.writeFileSync(filePath, nextContent, 'utf8');
	}

	return changed;
}

const files = {
	gradle: path.join(root, 'node_modules', '@exxili', 'capacitor-nfc', 'android', 'build.gradle'),
	definitions: path.join(root, 'node_modules', '@exxili', 'capacitor-nfc', 'dist', 'esm', 'definitions.d.ts'),
	indexEsm: path.join(root, 'node_modules', '@exxili', 'capacitor-nfc', 'dist', 'esm', 'index.js'),
	androidPlugin: path.join(root, 'node_modules', '@exxili', 'capacitor-nfc', 'android', 'src', 'main', 'kotlin', 'com', 'exxili', 'capacitornfc', 'NFCPlugin.kt'),
	iosPlugin: path.join(root, 'node_modules', '@exxili', 'capacitor-nfc', 'ios', 'Sources', 'NFCPlugin', 'NFCPlugin.swift'),
	iosWriter: path.join(root, 'node_modules', '@exxili', 'capacitor-nfc', 'ios', 'Sources', 'NFCPlugin', 'NFCWriter.swift'),
};

let changedCount = 0;

if (
	replaceInFile(files.gradle, [
		{
			label: 'modern-proguard',
			from: "getDefaultProguardFile('proguard-android.txt')",
			to: "getDefaultProguardFile('proguard-android-optimize.txt')",
		},
	])
) {
	changedCount++;
}

if (
	replaceInFile(files.definitions, [
		{
			label: 'write-result-interface',
			from: `export interface NFCError {
    /**
     * The error message.
     */
    error: string;
}
export interface NDEFWriteOptions<T extends PayloadType = Uint8Array> {`,
			to: `export interface NFCError {
    /**
     * The error message.
     */
    error: string;
}
export interface NFCWriteResult {
    success?: boolean;
    tagInfo?: TagInfo;
}
export interface NDEFWriteOptions<T extends PayloadType = Uint8Array> {`,
		},
		{
			label: 'onwrite-payload',
			from: `    onWrite: (listenerFunc: () => void) => () => void;`,
			to: `    onWrite: (listenerFunc: (data?: NFCWriteResult) => void) => () => void;`,
		},
		{
			label: 'addlistener-write-payload',
			from: `    addListener(eventName: 'nfcWriteSuccess', listenerFunc: () => void): Promise<PluginListenerHandle> & PluginListenerHandle;`,
			to: `    addListener(eventName: 'nfcWriteSuccess', listenerFunc: (data: NFCWriteResult) => void): Promise<PluginListenerHandle> & PluginListenerHandle;`,
		},
	])
) {
	changedCount++;
}

if (
	replaceInFile(files.indexEsm, [
		{
			label: 'onwrite-forward-data',
			from: "        NFCPlug.addListener(`nfcWriteSuccess`, func).then((h) => (handle = h));",
			to: "        NFCPlug.addListener(`nfcWriteSuccess`, (data) => func(data)).then((h) => (handle = h));",
		},
	])
) {
	changedCount++;
}

if (
	replaceInFile(files.androidPlugin, [
		{
			label: 'android-taginfo-prewrite',
			from: `    private fun handleWriteTag(intent: Intent) {
        val records = recordsBuffer?.toList<JSONObject>()
        if(records != null) {`,
			to: `    private fun handleWriteTag(intent: Intent) {
        val records = recordsBuffer?.toList<JSONObject>()
        val tag = intent.getParcelableExtra(NfcAdapter.EXTRA_TAG, Tag::class.java)
        val tagInfo = tag?.let { extractTagInfo(it) }
        if(records != null) {`,
		},
		{
			label: 'android-tag-var',
			from: `                val ndefMessage = NdefMessage(ndefRecords.toTypedArray())
                val tag = intent.getParcelableExtra(NfcAdapter.EXTRA_TAG, Tag::class.java)
                var ndef = Ndef.get(tag)`,
			to: `                val ndefMessage = NdefMessage(ndefRecords.toTypedArray())
                if (tag == null) {
                    notifyListeners(
                        "nfcError",
                        JSObject().put(
                            "error",
                            "Failed to resolve NFC tag from the write session."
                        )
                    )
                    return
                }
                var ndef = Ndef.get(tag)`,
		},
		{
			label: 'android-write-success-payload',
			from: `                notifyListeners("nfcWriteSuccess", JSObject().put("success", true))`,
			to: `                val response = JSObject().put("success", true)
                if (tagInfo != null) {
                    response.put("tagInfo", tagInfo)
                }
                notifyListeners("nfcWriteSuccess", response)`,
		},
	])
) {
	changedCount++;
}

if (
	replaceInFile(files.iosPlugin, [
		{
			label: 'ios-write-success-payload',
			from: `        writer.onWriteSuccess = {
            self.notifyListeners("nfcWriteSuccess", data: ["success": true])
        }`,
			to: `        writer.onWriteSuccess = { tagInfo in
            var response: [String: Any] = ["success": true]
            if let tagInfo = tagInfo {
                response["tagInfo"] = tagInfo
            }
            self.notifyListeners("nfcWriteSuccess", data: response)
        }`,
		},
	])
) {
	changedCount++;
}

const iosWriterContent = `import Foundation
import CoreNFC

@objc public class NFCWriter: NSObject, NFCTagReaderSessionDelegate {
    private var writerSession: NFCTagReaderSession?
    private var messageToWrite: NFCNDEFMessage?

    public var onWriteSuccess: (([String: Any]?) -> Void)?
    public var onError: ((Error) -> Void)?

    @objc public func startWriting(message: NFCNDEFMessage) {
        print("NFCWriter startWriting called")
        self.messageToWrite = message

        guard NFCTagReaderSession.readingAvailable else {
            print("NFC writing not supported on this device")
            return
        }

        guard let session = NFCTagReaderSession(pollingOption: [.iso14443, .iso15693, .iso18092], delegate: self, queue: nil) else {
            print("Failed to create NFCTagReaderSession")
            return
        }

        writerSession = session
        writerSession?.alertMessage = "Hold your iPhone near the NFC tag to write."
        writerSession?.begin()
    }

    public func tagReaderSessionDidBecomeActive(_ session: NFCTagReaderSession) {}

    public func tagReaderSession(_ session: NFCTagReaderSession, didInvalidateWithError error: Error) {
        print("NFC writer session error: \\(error.localizedDescription)")
        onError?(error)
    }

    public func tagReaderSession(_ session: NFCTagReaderSession, didDetect tags: [NFCTag]) {
        if tags.count > 1 {
            let retryInterval = DispatchTimeInterval.milliseconds(500)
            session.alertMessage = "More than one tag detected. Please try again."
            DispatchQueue.global().asyncAfter(deadline: .now() + retryInterval) {
                session.restartPolling()
            }
            return
        }

        guard let tag = tags.first else { return }
        let tagInfo = extractTagInfo(from: tag)

        session.connect(to: tag) { error in
            if let error = error {
                session.invalidate(errorMessage: "Unable to connect to tag.")
                self.onError?(error)
                return
            }

            guard let ndefTag = self.asNDEFTag(tag) else {
                session.invalidate(errorMessage: "Tag does not support NDEF.")
                self.onError?(NSError(domain: "NFCWriter", code: -1, userInfo: [NSLocalizedDescriptionKey: "Tag does not support NDEF."]))
                return
            }

            ndefTag.queryNDEFStatus { status, _, error in
                if let error = error {
                    session.invalidate(errorMessage: "Unable to query the NDEF status of tag.")
                    self.onError?(error)
                    return
                }

                switch status {
                case .notSupported:
                    session.invalidate(errorMessage: "Tag is not NDEF compliant.")
                case .readOnly:
                    session.invalidate(errorMessage: "Tag is read-only.")
                case .readWrite:
                    guard let message = self.messageToWrite else {
                        session.invalidate(errorMessage: "No message to write.")
                        return
                    }

                    ndefTag.writeNDEF(message) { error in
                        if let error = error {
                            session.invalidate(errorMessage: "Failed to write NDEF message.")
                            self.onError?(error)
                            return
                        }

                        session.alertMessage = "NDEF message written successfully."
                        session.invalidate()
                        self.onWriteSuccess?(tagInfo)
                    }
                @unknown default:
                    session.invalidate(errorMessage: "Unknown NDEF tag status.")
                }
            }
        }
    }

    private func asNDEFTag(_ tag: NFCTag) -> NFCNDEFTag? {
        switch tag {
        case .iso7816(let iso7816Tag):
            return iso7816Tag
        case .miFare(let miFareTag):
            return miFareTag
        case .feliCa(let feliCaTag):
            return feliCaTag
        case .iso15693(let iso15693Tag):
            return iso15693Tag
        @unknown default:
            return nil
        }
    }

    private func extractTagInfo(from tag: NFCTag) -> [String: Any] {
        var tagInfo: [String: Any] = [:]
        var techTypes: [String] = []
        var uid: String = ""

        switch tag {
        case .iso7816(let iso7816Tag):
            uid = iso7816Tag.identifier.map { String(format: "%02X", $0) }.joined()
            techTypes.append("ISO7816")
            tagInfo["type"] = "ISO7816"

        case .miFare(let miFareTag):
            uid = miFareTag.identifier.map { String(format: "%02X", $0) }.joined()
            techTypes.append("MiFare")
            tagInfo["type"] = "MiFare"

        case .feliCa(let feliCaTag):
            uid = feliCaTag.currentIDm.map { String(format: "%02X", $0) }.joined()
            techTypes.append("FeliCa")
            tagInfo["type"] = "FeliCa"

        case .iso15693(let iso15693Tag):
            uid = iso15693Tag.identifier.map { String(format: "%02X", $0) }.joined()
            techTypes.append("ISO15693")
            tagInfo["type"] = "ISO15693"

        @unknown default:
            techTypes.append("Unknown")
            tagInfo["type"] = "Unknown"
        }

        tagInfo["uid"] = uid
        tagInfo["techTypes"] = techTypes
        return tagInfo
    }
}
`;

if (writeIfChanged(files.iosWriter, iosWriterContent)) {
	changedCount++;
}

if (changedCount > 0) {
	console.log(`[postinstall] Applied ${changedCount} NFC patch set(s).`);
} else {
	console.log('[postinstall] NFC patches already applied.');
}
