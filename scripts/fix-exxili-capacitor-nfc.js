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
	iosReader: path.join(root, 'node_modules', '@exxili', 'capacitor-nfc', 'ios', 'Sources', 'NFCPlugin', 'NFCReader.swift'),
	iosWriter: path.join(root, 'node_modules', '@exxili', 'capacitor-nfc', 'ios', 'Sources', 'NFCPlugin', 'NFCWriter.swift'),
	packageSwift: path.join(root, 'node_modules', '@exxili', 'capacitor-nfc', 'Package.swift'),
};

let changedCount = 0;

if (
	replaceInFile(files.packageSwift, [
		{
			label: 'spm-package-name',
			from: 'name: "CapacitorNfc"',
			to: 'name: "ExxiliCapacitorNfc"',
		},
		{
			label: 'spm-product-name',
			from: 'name: "CapacitorNfc",\n            targets: ["NFCPlugin"]',
			to: 'name: "ExxiliCapacitorNfc",\n            targets: ["NFCPlugin"]',
		},
		{
			label: 'spm-capacitor-swift-pm-version',
			from: '.package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", branch: "main")',
			to: '.package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", exact: "8.0.0")',
		},
		{
			label: 'spm-ios-platform',
			from: 'platforms: [.iOS(.v13)]',
			to: 'platforms: [.iOS(.v15)]',
		},
	])
) {
	changedCount++;
}

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

// Always write the patched iOS plugin sources so cancel/reject behavior stays consistent across installs.
const iosPluginContent = `import Foundation
import Capacitor
import CoreNFC

@objc(NFCPlugin)
public class NFCPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "NFCPlugin"
    public let jsName = "NFC"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "isSupported", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "cancelWriteAndroid", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "startScan", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "cancelScan", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "writeNDEF", returnType: CAPPluginReturnPromise)
    ]

    private let reader = NFCReader()
    private let writer = NFCWriter()
    private var pendingWriteCall: CAPPluginCall?

    @objc func isSupported(_ call: CAPPluginCall) {
        call.resolve(["supported": NFCNDEFReaderSession.readingAvailable])
    }

    @objc func cancelWriteAndroid(_ call: CAPPluginCall) {
        call.reject("Function not implemented for iOS")
    }

    @objc func startScan(_ call: CAPPluginCall) {
        print("startScan called")
        if let preferredMode = call.getString("mode") {
            reader.setPreferredReaderMode(preferredMode)
        } else if call.getBool("forceFull") == true {
            reader.setPreferredReaderMode("full")
        } else if call.getBool("forceCompat") == true {
            reader.setPreferredReaderMode("compat")
        } else if call.getBool("forceNDEF") == true {
            reader.setPreferredReaderMode("ndef")
        }
        reader.onNDEFMessageReceived = { messages, tagInfo in
            var ndefMessages = [[String: Any]]()

            if messages.isEmpty {
                // If no NDEF messages but we have tag info, create a fallback record with the UID
                if let tagInfo = tagInfo, let uid = tagInfo["uid"] as? String {
                    let payloadData = uid.data(using: .utf8)?.base64EncodedString() ?? ""
                    let records = [[
                        "type": "ID",
                        "payload": payloadData
                    ]]
                    ndefMessages.append([
                        "records": records
                    ])
                }
            } else {
                for message in messages {
                    var records = [[String: Any]]()
                    for record in message.records {
                        let recordType = String(data: record.type, encoding: .utf8) ?? ""
                        let payloadData = record.payload.base64EncodedString()

                        records.append([
                            "type": recordType,
                            "payload": payloadData
                        ])
                    }
                    ndefMessages.append([
                        "records": records
                    ])
                }
            }

            var response: [String: Any] = ["messages": ndefMessages]
            if let tagInfo = tagInfo {
                response["tagInfo"] = tagInfo
            }

            DispatchQueue.main.async {
                self.notifyListeners("nfcTag", data: response)
            }
        }

        reader.onError = { error in
            let message: String
            if let nfcError = error as? NFCReaderError {
                if nfcError.code == .readerSessionInvalidationErrorUserCanceled {
                    message = "canceled"
                } else {
                    message = nfcError.localizedDescription
                }
            } else {
                message = error.localizedDescription
            }

            DispatchQueue.main.async {
                self.notifyListeners("nfcError", data: ["error": message])
            }
        }

        reader.startScanning()
        call.resolve()
    }

    @objc func cancelScan(_ call: CAPPluginCall) {
        reader.cancelScanning()
        call.resolve()
    }

    @objc func writeNDEF(_ call: CAPPluginCall) {
        print("writeNDEF called")

        guard let recordsData = call.getArray("records") as? [[String: Any]] else {
            call.reject("Records are required")
            return
        }

        if pendingWriteCall != nil {
            call.reject("NFC write already in progress")
            return
        }

        var ndefRecords = [NFCNDEFPayload]()
        for recordData in recordsData {
            guard let type = recordData["type"] as? String,
                let payload = recordData["payload"] as? [NSNumber]
            else {
                print("Skipping record due to missing or invalid record")
                continue
            }

            guard let payloadArray = payload as [NSNumber]? else {
                print("Skipping record due to missing or invalid 'payload' (expected array of numbers)")
                continue
            }

            var payloadBytes = [UInt8]()
            for number in payloadArray {
                payloadBytes.append(number.uint8Value)
            }
            let payloadData = Data(payloadBytes)

            let format: NFCTypeNameFormat
            let typeEncoding: String.Encoding
            if type == "T" || type == "U" {
                format = .nfcWellKnown
                typeEncoding = .utf8
            } else if type.contains("/") {
                format = .media
                typeEncoding = .ascii
            } else {
                format = .nfcExternal
                typeEncoding = .utf8
            }

            guard let typeData = type.data(using: typeEncoding) else {
                print("Skipping record due to unsupported type encoding")
                continue
            }

            let ndefRecord = NFCNDEFPayload(
                format: format,
                type: typeData,
                identifier: Data(),
                payload: payloadData
            )
            ndefRecords.append(ndefRecord)
        }

        let ndefMessage = NFCNDEFMessage(records: ndefRecords)
        pendingWriteCall = call

        writer.onWriteSuccess = { tagInfo in
            DispatchQueue.main.async {
                var response: [String: Any] = ["success": true]
                if let tagInfo = tagInfo {
                    response["tagInfo"] = tagInfo
                }
                self.notifyListeners("nfcWriteSuccess", data: response)
                self.pendingWriteCall?.resolve(response)
                self.pendingWriteCall = nil
            }
        }

        writer.onError = { error in
            DispatchQueue.main.async {
                guard self.pendingWriteCall != nil else { return }

                let message: String
                if let nfcError = error as? NFCReaderError {
                    if nfcError.code == .readerSessionInvalidationErrorUserCanceled {
                        message = "canceled"
                    } else {
                        message = nfcError.localizedDescription
                    }
                } else {
                    message = error.localizedDescription
                }

                self.notifyListeners("nfcError", data: ["error": message])
                self.pendingWriteCall?.reject(message)
                self.pendingWriteCall = nil
            }
        }

        // Keep the Capacitor call open until the NFC sheet finishes (success or cancel).
        writer.startWriting(message: ndefMessage)
    }
}
`;

if (writeIfChanged(files.iosPlugin, iosPluginContent)) {
	changedCount++;
}

if (
	replaceInFile(files.iosReader, [
		{
			label: 'ios-tag-session-emit-user-cancel',
			from: `        if nfcError.code == .readerSessionInvalidationErrorUserCanceled {
            return
        }`,
			to: `        if nfcError.code == .readerSessionInvalidationErrorUserCanceled {
            onError?(error)
            return
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
    private var didCompleteSuccessfully = false

    public var onWriteSuccess: (([String: Any]?) -> Void)?
    public var onError: ((Error) -> Void)?

    @objc public func startWriting(message: NFCNDEFMessage) {
        print("NFCWriter startWriting called")
        self.messageToWrite = message
        self.didCompleteSuccessfully = false

        guard NFCTagReaderSession.readingAvailable else {
            print("NFC writing not supported on this device")
            onError?(NSError(domain: "NFCWriter", code: -1, userInfo: [NSLocalizedDescriptionKey: "NFC writing is not supported on this device."]))
            return
        }

        guard let session = NFCTagReaderSession(pollingOption: [.iso14443, .iso15693, .iso18092], delegate: self, queue: nil) else {
            print("Failed to create NFCTagReaderSession")
            onError?(NSError(domain: "NFCWriter", code: -2, userInfo: [NSLocalizedDescriptionKey: "Failed to create NFC write session."]))
            return
        }

        writerSession = session
        writerSession?.alertMessage = "Hold your iPhone near the NFC tag to write."
        writerSession?.begin()
    }

    public func tagReaderSessionDidBecomeActive(_ session: NFCTagReaderSession) {}

    public func tagReaderSession(_ session: NFCTagReaderSession, didInvalidateWithError error: Error) {
        print("NFC writer session error: \\(error.localizedDescription)")
        writerSession = nil

        // Successful writes also invalidate the session and often report UserCanceled.
        if didCompleteSuccessfully {
            didCompleteSuccessfully = false
            return
        }

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
                        self.didCompleteSuccessfully = true
                        self.onWriteSuccess?(tagInfo)
                        session.invalidate()
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
