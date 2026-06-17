const fs = require('fs');
const path = require('path');

const root = process.cwd();
const statusBarSwiftPath = path.join(
	root,
	'node_modules/@capacitor/status-bar/ios/Sources/StatusBarPlugin/StatusBar.swift'
);

function readIfExists(filePath) {
	if (!fs.existsSync(filePath)) return null;
	return fs.readFileSync(filePath, 'utf8');
}

function writeIfChanged(filePath, nextContent) {
	const currentContent = readIfExists(filePath);
	if (currentContent === null) {
		console.log(`[postinstall] Skip StatusBar patch: file not found: ${filePath}`);
		return false;
	}

	if (currentContent === nextContent) return false;
	fs.writeFileSync(filePath, nextContent, 'utf8');
	return true;
}

const currentContent = readIfExists(statusBarSwiftPath);
if (currentContent === null) {
	console.log('[postinstall] Skip StatusBar patch: @capacitor/status-bar not installed.');
	process.exit(0);
}

let patchedContent = currentContent;
let changed = false;

if (!patchedContent.includes('private var style: UIStatusBarStyle!')) {
	patchedContent = patchedContent
		.replace(
			`    private var isOverlayingWebview = true
    private var backgroundColor = UIColor.black`,
			`    private var isOverlayingWebview: Bool!
    private var backgroundColor: UIColor!
    private var style: UIStatusBarStyle!`
		)
		.replace(
			`    private func handleViewDidAppear(config: StatusBarConfig) {
        setStyle(config.style)
        setBackgroundColor(config.backgroundColor)
        setOverlaysWebView(config.overlaysWebView)
    }`,
			`    private func handleViewDidAppear(config: StatusBarConfig) {
        setStyle(self.style ?? config.style)
        setBackgroundColor(self.backgroundColor ?? config.backgroundColor)
        setOverlaysWebView(self.isOverlayingWebview ?? config.overlaysWebView)
    }`
		)
		.replace(
			`    func setStyle(_ style: UIStatusBarStyle) {
        bridge.statusBarStyle = style
    }`,
			`    func setStyle(_ style: UIStatusBarStyle) {
        self.style = style
        bridge.statusBarStyle = self.style
    }`
		)
		.replace(
			`    func setBackgroundColor(_ color: UIColor) {
        backgroundColor = color
        backgroundView?.backgroundColor = color
    }`,
			`    func setBackgroundColor(_ color: UIColor) {
        self.backgroundColor = color
        if isOverlayingWebview == false {
            restoreStatusBarBackground()
        } else {
            backgroundView?.backgroundColor = self.backgroundColor
        }
    }`
		)
		.replace(
			`    func setOverlaysWebView(_ overlay: Bool) {
        if overlay == isOverlayingWebview { return }
        isOverlayingWebview = overlay`,
			`    func setOverlaysWebView(_ overlay: Bool) {
        if overlay == isOverlayingWebview {
            if !overlay {
                restoreStatusBarBackground()
            }
            resizeWebView()
            return
        }
        isOverlayingWebview = overlay`
		);
	changed = true;
}

if (!patchedContent.includes('restoreStatusBarBackground()')) {
	patchedContent = patchedContent.replace(
		`    func setBackgroundColor(_ color: UIColor) {
        self.backgroundColor = color
        backgroundView?.backgroundColor = self.backgroundColor
    }`,
		`    func setBackgroundColor(_ color: UIColor) {
        self.backgroundColor = color
        if isOverlayingWebview == false {
            restoreStatusBarBackground()
        } else {
            backgroundView?.backgroundColor = self.backgroundColor
        }
    }`
	);
	changed = true;
}

if (!patchedContent.includes('if !overlay {\n                restoreStatusBarBackground()')) {
	patchedContent = patchedContent.replace(
		`    func setOverlaysWebView(_ overlay: Bool) {
        if overlay == isOverlayingWebview {
            resizeWebView()
            return
        }`,
		`    func setOverlaysWebView(_ overlay: Bool) {
        if overlay == isOverlayingWebview {
            if !overlay {
                restoreStatusBarBackground()
            }
            resizeWebView()
            return
        }`
	);
	changed = true;
}

if (!patchedContent.includes('private func restoreStatusBarBackground()')) {
	patchedContent = patchedContent.replace(
		`    private func initializeBackgroundViewIfNeeded() {
        if backgroundView == nil {
            backgroundView = UIView(frame: getStatusBarFrame())
            backgroundView!.backgroundColor = backgroundColor
            backgroundView!.autoresizingMask = [.flexibleWidth, .flexibleBottomMargin]
            backgroundView!.isHidden = !bridge.statusBarVisible
        }
    }
}`,
		`    private func initializeBackgroundViewIfNeeded() {
        if backgroundView == nil {
            backgroundView = UIView(frame: getStatusBarFrame())
            backgroundView!.backgroundColor = backgroundColor
            backgroundView!.autoresizingMask = [.flexibleWidth, .flexibleBottomMargin]
            backgroundView!.isHidden = !bridge.statusBarVisible
        }
    }

    private func restoreStatusBarBackground() {
        initializeBackgroundViewIfNeeded()
        if let backgroundView = backgroundView, backgroundView.superview == nil {
            bridge.webView?.superview?.addSubview(backgroundView)
        }
        resizeStatusBarBackgroundView()
        backgroundView?.backgroundColor = backgroundColor
        backgroundView?.isHidden = !bridge.statusBarVisible
    }
}`
	);
	changed = true;
}

if (!changed) {
	console.log('[postinstall] StatusBar patch already applied.');
	process.exit(0);
}

if (patchedContent === currentContent) {
	console.log('[postinstall] Skip StatusBar patch: source pattern not found (plugin version may differ).');
	process.exit(0);
}

if (writeIfChanged(statusBarSwiftPath, patchedContent)) {
	console.log('[postinstall] Applied Capacitor StatusBar iOS patch (ionic-team/capacitor-plugins#2347 + background restore).');
}
