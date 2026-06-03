# Giải nén bản web trên Windows Server (chạy tay hoặc qua CI).
# Tham số:
#   -WebDir  C:/Data/HostingSpaces/CA/erp.dev.appcenter.vn
#   -ZipFile V0.21.64.zip

param(
	[Parameter(Mandatory = $true)]
	[string]$WebDir,
	[Parameter(Mandatory = $true)]
	[string]$ZipFile
)

$ErrorActionPreference = 'Stop'

$webDir = $WebDir.TrimEnd('\', '/')
$zipPath = Join-Path $webDir $ZipFile

Write-Host "Deploy dir: $webDir"
Write-Host "Zip file: $zipPath"

if (-not (Test-Path -LiteralPath $zipPath)) {
	Write-Error "Khong thay file zip: $zipPath"
	exit 1
}

if (-not (Test-Path -LiteralPath $webDir)) {
	New-Item -ItemType Directory -Path $webDir -Force | Out-Null
}

Expand-Archive -LiteralPath $zipPath -DestinationPath $webDir -Force
Remove-Item -LiteralPath $zipPath -Force
Write-Host "Deployed $ZipFile -> $webDir"
Get-ChildItem -LiteralPath $webDir | Select-Object -First 15 Name
