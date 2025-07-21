/*
Compute application base href from environment variables.

In environment.prod.ts:
  - appLocation: base path prefix (e.g., '/').
  - versionLocation: path segment with placeholder 'V{{REPLACE_VERSION}}/'.

This script reads appLocation and versionLocation, replaces '{{REPLACE_VERSION}}'
with the appVersion from package.json, ensures trailing slashes, and concatenates
them to form the final baseHrefValue.

In www/index.html:
  - Find the document.write call with 'REPLACE_BASE_HREF'.
  - Replace 'REPLACE_BASE_HREF' with the computed baseHrefValue.
*/


const fs = require('fs');
const path = require('path');

// Read appVersion from package.json
const packageJsonPath = path.resolve(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const appVersion = packageJson.version;

// Read environment.prod.ts to get baseHref
const envProdPath = path.resolve(__dirname, 'src/environments/environment.prod.ts');
const envProdContent = fs.readFileSync(envProdPath, 'utf8');
// Extract appLocation and versionLocation
const appLocationMatch = envProdContent.match(/appLocation\s*:\s*['"`]([^'"`]+)['"`]/);
const versionLocationMatch = envProdContent.match(/versionLocation\s*:\s*['"`]([^'"`]+)['"`]/);
let appLocation = '/';
let versionLocation = '/';
if (appLocationMatch) {
  appLocation = appLocationMatch[1];
  if (!appLocation.endsWith('/')) appLocation += '/';
}
if (versionLocationMatch) {
  versionLocation = versionLocationMatch[1].replace('{{REPLACE_VERSION}}', appVersion);
  if (!versionLocation.endsWith('/')) versionLocation += '/';
}
// Compute baseHrefValue as appLocation + versionLocation
const baseHrefValue = appLocation + versionLocation;

// Read source index.html and replace REPLACE_VERSION segment
const indexPath = path.resolve(__dirname, 'www/index.html');
let indexContent = fs.readFileSync(indexPath, 'utf8');
// Replace the '/REPLACE_VERSION/' part in the document.write call with computed baseHrefValue
indexContent = indexContent.replace(
  /\+\s*'REPLACE_BASE_HREF'\s*\+/g,
  `+ '${baseHrefValue}' +`
);

// Ghi lại file index.html
fs.writeFileSync(indexPath, indexContent, 'utf8');
console.log(`Base href updated to: ${baseHrefValue}`);

// Zip only the contents of the www folder into a versioned archive (no outer www dir)
const { execSync } = require('child_process');
const zipFileName = `V${appVersion}.zip`;
try {
  // change into www folder and zip its contents to one level up
  execSync(`zip -r ../${zipFileName} .`, {
    cwd: path.resolve(__dirname, 'www'),
    stdio: 'inherit'
  });
  console.log(`Created zip archive: ${zipFileName}`);
} catch (err) {
  console.error('Error creating zip archive:', err);
}