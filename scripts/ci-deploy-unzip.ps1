# Giải nén bản web sau khi đã upload SCP (chạy trên Windows Server).
# Env: ZIP_FILE, SSH_REMOTE_DIR, APP_VERSION (optional)

$ErrorActionPreference = 'Stop'

if (-not $env:ZIP_FILE) { throw 'ZIP_FILE is required' }
if (-not $env:SSH_REMOTE_DIR) { throw 'SSH_REMOTE_DIR is required' }

$webDir = $env:SSH_REMOTE_DIR.TrimEnd('\', '/')
$zipFile = $env:ZIP_FILE
$zipPath = Join-Path $webDir $zipFile

if (-not (Test-Path -LiteralPath $zipPath)) {
	Write-Error "Khong thay file zip: $zipPath"
	Get-ChildItem -LiteralPath $webDir -ErrorAction SilentlyContinue
	exit 1
}

if (-not (Test-Path -LiteralPath $webDir)) {
	New-Item -ItemType Directory -Path $webDir -Force | Out-Null
}

Expand-Archive -LiteralPath $zipPath -DestinationPath $webDir -Force
Remove-Item -LiteralPath $zipPath -Force
$versionSuffix = if ($env:APP_VERSION) { " (version $($env:APP_VERSION))" } else { '' }
Write-Host "Deployed $zipFile -> $webDir$versionSuffix"
