/*
REPLACE_VERSION is a placeholder in environment.prod.ts and index.html used to automatically insert the application version into the base href.

In environment.prod.ts:
  - baseHref can be '/', '/{{REPLACE_VERSION}}/' or 'ERP/{{REPLACE_VERSION}}/'.
  - After building, this script reads environment.baseHref, replaces {{REPLACE_VERSION}} with appVersion (from package.json), and generates baseHrefValue.

In www/index.html:
  - Find the code document.write("<base href='" + window.location.origin + '/REPLACE_VERSION/' + "' />");  // REPLACE_VERSION
  - Replace REPLACE_VERSION with baseHrefValue
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
const baseHrefMatch = envProdContent.match(/baseHref\s*:\s*['"`]([^'"`]+)['"`]/);
let baseHrefValue = '/';
if (baseHrefMatch) {
  baseHrefValue = baseHrefMatch[1].replace('{{REPLACE_VERSION}}', appVersion);
  if (!baseHrefValue.endsWith('/')) baseHrefValue += '/';
}

// Read source index.html and replace REPLACE_VERSION segment
const indexPath = path.resolve(__dirname, 'www/index.html');
let indexContent = fs.readFileSync(indexPath, 'utf8');
// Replace the '/REPLACE_VERSION/' part in the document.write call with computed baseHrefValue
indexContent = indexContent.replace(
  /\+\s*'\/REPLACE_VERSION\/'\s*\+/g,
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