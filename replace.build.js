function updateAngularBaseHref(baseHref) {
	const angularJsonPath = path.resolve(__dirname, 'angular.json');
	if (!fs.existsSync(angularJsonPath)) return;
	let angularConfig = JSON.parse(fs.readFileSync(angularJsonPath, 'utf8'));
	const projectKey = Object.keys(angularConfig.projects)[0];
	if (!angularConfig.projects[projectKey].architect) angularConfig.projects[projectKey].architect = {};
	if (!angularConfig.projects[projectKey].architect.build) angularConfig.projects[projectKey].architect.build = {};
	if (!angularConfig.projects[projectKey].architect.build.options) angularConfig.projects[projectKey].architect.build.options = {};
	const buildOptions = angularConfig.projects[projectKey].architect.build.options;
	if (baseHref && baseHref !== '/') {
		buildOptions.baseHref = baseHref;
		console.log('Updated baseHref in angular.json:', baseHref);
	} else {
		if ('baseHref' in buildOptions) {
			delete buildOptions.baseHref;
			console.log('Removed baseHref from angular.json');
		}
	}
	fs.writeFileSync(angularJsonPath, JSON.stringify(angularConfig, null, 2), 'utf8');
}
const fs = require('fs');
const path = require('path');
const androidProjectFile = './android/app/build.gradle';
const iosProjectFile = 'ios/App/App.xcodeproj/project.pbxproj';

let MARKETING_VERSION, APP_BUNDLE, PROJECT_VERSION, BASE_HREF;
const args = process.argv.slice(2);
const command = args[0];

function getVersion(packageVersion = null) {
	delete require.cache[require.resolve('./package.json')];
	const packageJson = require('./package.json');
	let localMarketingVersion = packageVersion || packageJson.version;
	let localAppBundle = packageJson.name;
	let localProjectVersion = parseInt(localMarketingVersion.replaceAll('.', ''));
	const envProdPath = path.resolve(__dirname, 'src/environments/environment.prod.ts');
	const envProdContent = fs.existsSync(envProdPath) ? fs.readFileSync(envProdPath, 'utf8') : '';
	let appLocation = '/';
	let versionLocation = '';
	if (envProdContent) {
		const appLocationMatch = envProdContent.match(/appLocation\s*:\s*(['"`])([^'"`]*)\1/);
		const versionLocationMatch = envProdContent.match(/versionLocation\s*:\s*(['"`])([^'"`]*)\1/);
		if (appLocationMatch) {
			appLocation = appLocationMatch[2];
		}
		if (versionLocationMatch) {
			versionLocation = versionLocationMatch[2].replace('{{REPLACE_VERSION}}', localMarketingVersion);
		}
	}
	let localBaseHref = appLocation + versionLocation;
	// Update global variables
	MARKETING_VERSION = localMarketingVersion;
	APP_BUNDLE = localAppBundle;
	PROJECT_VERSION = localProjectVersion;
	BASE_HREF = localBaseHref;

	console.log('------------------------------------');
	console.log('APP_BUNDLE         - ', APP_BUNDLE);
	console.log('MARKETING_VERSION  - ', MARKETING_VERSION);
	console.log('PROJECT_VERSION    - ', PROJECT_VERSION);
	console.log('BASE_HREF          - ', BASE_HREF);
	console.log('-------------------------------------');

	return { MARKETING_VERSION, APP_BUNDLE, PROJECT_VERSION, BASE_HREF };
}

function backupAndroidFolder() {
	return new Promise((resolve, reject) => {
		try {
			let androidFileData = fs.readFileSync(androidProjectFile, 'utf8');
			var androidRegx = /applicationId "(.*)"/g;
			var androidAppId = androidRegx.exec(androidFileData)[1];
			//replace dms2 with dms
			androidAppId = androidAppId.replace('dms2', 'dms');

			fs.renameSync('android', 'android.' + androidAppId + '.app');
			console.log('Rename android => android.' + androidAppId + '.app');
			resolve();
		} catch (err) {
			reject('Android not found.');
		}
	});
}

function backupIosFolder() {
	return new Promise((resolve, reject) => {
		try {
			let iosFileData = fs.readFileSync(iosProjectFile, 'utf8');
			var iosRegx = /PRODUCT_BUNDLE_IDENTIFIER = (.*);/g;
			var iosAppId = iosRegx.exec(iosFileData)[1];

			fs.renameSync('ios', 'ios.' + iosAppId + '.app');
			console.log('Rename ios => ios.' + iosAppId + '.app');
			resolve();
		} catch (err) {
			reject('ios not found.');
		}
	});
}

async function restoreAndroidFolder() {
	try {
		console.log('Rename android.' + buildAppId + '.app folders => android.');
		fs.renameSync('android.' + buildAppId + '.app', 'android');
		console.log('Rename android.' + buildAppId + ' folders => android.');
	} catch (err) {
		console.error('Error restoring android folder.');
	}
}

async function restoreIosFolder() {
	try {
		fs.renameSync('ios.' + buildAppId + '.app', 'ios');
		console.log('Rename ios.' + buildAppId + ' folders => ios.');
	} catch (err) {
		console.error('Error restoring ios folder.');
	}
}
async function updateEnvironmentPROD(replace) {
	try {
		let filePath = 'src/environments/environment.prod.ts';
		if (!fs.existsSync(filePath)) {
			throw new Error('File not found: ' + filePath);
		} else {
			const environmentPROD = {
				files: filePath,
				from: /appVersion: '(.*)'/g,
				to: "appVersion: '" + MARKETING_VERSION + "'",
				allowEmptyPaths: false,
			};
			await replace.replaceInFile(environmentPROD);
			return 'updateEnvironmentPROD';
		}
	} catch (err) {
		throw new Error('Error updating environmentPROD');
	}
}

async function updateAndroidFiles(replace) {
	try {
		if (!fs.existsSync(androidProjectFile)) {
			throw new Error('File not found: ' + androidProjectFile);
		} else {
			// Gộp tất cả Android updates vào một lần ghi file
			const androidUpdates = {
				files: androidProjectFile,
				from: [
					/versionName "(.*)"/g,
					/versionCode (.*)/g
				],
				to: [
					'versionName "' + MARKETING_VERSION + '"',
					'versionCode ' + PROJECT_VERSION + '00'
				],
				allowEmptyPaths: false,
			};
			await replace.replaceInFile(androidUpdates);
			return 'updateAndroidFiles';
		}
	} catch (err) {
		throw new Error('Error updating Android files');
	}
}

async function updateIosFiles(replace) {
	if (!fs.existsSync(iosProjectFile)) {
		throw new Error('File not found: ' + iosProjectFile);
	} else {
		try {
			// Gộp tất cả iOS updates vào một lần ghi file
			const iosUpdates = {
				files: iosProjectFile,
				from: [
					/MARKETING_VERSION = (.*);/g,
					/CURRENT_PROJECT_VERSION = (.*);/g
				],
				to: [
					'MARKETING_VERSION = ' + MARKETING_VERSION + ';',
					'CURRENT_PROJECT_VERSION = ' + PROJECT_VERSION + '00' + ';'
				],
				allowEmptyPaths: false,
			};
			await replace.replaceInFile(iosUpdates);
			return 'updateIosFiles';
		} catch (err) {
			throw new Error('Error updating iOS files');
		}
	}
}

async function updateWebResouces() {
	// Remove baseHref from angular.json
	updateAngularBaseHref(null);

	// Read source index.html và thay thế REPLACE_BASE_HREF bằng BASE_HREF
	const indexPath = path.resolve(__dirname, 'www/index.html');
	let indexContent = fs.readFileSync(indexPath, 'utf8');
	indexContent = indexContent.replace(
		/\+\s*'REPLACE_BASE_HREF'\s*\+/g,
		`+ '${BASE_HREF}' +`
	);
	fs.writeFileSync(indexPath, indexContent, 'utf8');
	console.log(`Base href updated to: ${BASE_HREF}`);

	

	//update manifest.webmanifest start_url
	const manifestPath = path.resolve(__dirname, 'www/manifest.webmanifest');
	let manifestContent = fs.readFileSync(manifestPath, 'utf8');
	manifestContent = manifestContent.replace(
		/"start_url":\s*"([^"]*)"/,
		`"start_url": "${BASE_HREF}"`
	);
	fs.writeFileSync(manifestPath, manifestContent, 'utf8');

	// Update version.json with the new version
	const versionJsonPath = path.resolve(__dirname, 'version.json');
	let versionJson = {};
	if (fs.existsSync(versionJsonPath)) {
		versionJson = JSON.parse(fs.readFileSync(versionJsonPath, 'utf8'));
	}
	versionJson.minVersion = MARKETING_VERSION;
	versionJson.latestVersion = MARKETING_VERSION;
	fs.writeFileSync(versionJsonPath, JSON.stringify(versionJson, null, 2), 'utf8');
	console.log(`Updated version.json: latestVersion = ${MARKETING_VERSION}`);


	// Zip only the contents of the www folder into a versioned archive (no outer www dir)
	const { execSync } = require('child_process');
	const zipFileName = `V${MARKETING_VERSION}.zip`;
	try {
		execSync(`zip -r ../${zipFileName} .`, {
			cwd: path.resolve(__dirname, 'www'),
			stdio: 'inherit'
		});
		console.log(`Created zip archive: ${zipFileName}`);
	} catch (err) {
		console.error('Error creating zip archive:', err);
	}
}

function bumpVersion(callback) {
	const { exec } = require('child_process');
	exec('npm version patch --no-git-tag-version', (error, stdout, stderr) => {
		if (error) {
			console.error(`Error: ${error.message}`);
			if (callback) callback(error);
			return;
		}
		if (stderr) {
			console.error(`stderr: ${stderr}`);
		}
		console.log(`stdout: ${stdout}`);
		console.log('✅ version updated');
		// Extract new version from stdout
		const match = stdout.match(/v(\d+\.\d+\.\d+)/);
		const newVersion = match ? match[1] : null;
		getVersion(newVersion);
		if (callback) callback(null);
	});
}

function runFullProcess() {
	Promise.all([backupAndroidFolder(), backupIosFolder()]).then(() => {
		console.log('Backup android + ios folders.');
	})
		.catch((err) => { })
		.finally(() => {
			Promise.all([restoreAndroidFolder(), restoreIosFolder()])
				.then(() => { })
				.catch((err) => {
					console.error(err);
				})
				.finally(() => {
					import('replace-in-file').then(async replace => {

						const results = await Promise.allSettled([
							updateEnvironmentPROD(replace),
							updateAndroidFiles(replace),
							updateIosFiles(replace),
						]);

						console.log(results);
						console.log('✅ All files updated successfully!');
						console.log('MARKETING_VERSION: ' + MARKETING_VERSION);
						console.log('PROJECT_VERSION: ' + PROJECT_VERSION);
						console.log('------------------------------------');
					});
				});

		});
}

async function runSpecificCommand(command, subCommand) {
	try {
		if (command === 'backup') {
			if (subCommand === 'android') {
				await backupAndroidFolder();
				console.log('✅ Android folder backed up successfully!');
			} else if (subCommand === 'ios') {
				await backupIosFolder();
				console.log('✅ iOS folder backed up successfully!');
			} else {
				// backup both
				await Promise.all([backupAndroidFolder(), backupIosFolder()]);
				console.log('✅ Both Android and iOS folders backed up successfully!');
			}
		}
		else if (command === 'restore') {
			if (subCommand === 'android') {
				await restoreAndroidFolder();
				console.log('✅ Android folder restored successfully!');
			} else if (subCommand === 'ios') {
				await restoreIosFolder();
				console.log('✅ iOS folder restored successfully!');
			} else {
				// restore both
				await Promise.all([restoreAndroidFolder(), restoreIosFolder()]);
				console.log('✅ Both Android and iOS folders restored successfully!');
			}
		}
		else if (command === 'update') {
			const replace = await import('replace-in-file');
			const results = await Promise.allSettled([
				updateEnvironmentPROD(replace),
				updateAndroidFiles(replace),
				updateIosFiles(replace),
			]);
			console.log(results);
			console.log('✅ All build files updated successfully!');
			console.log('MARKETING_VERSION: ' + MARKETING_VERSION);
			console.log('PROJECT_VERSION: ' + PROJECT_VERSION);
		}
		else if (command === 'build') {
			if (subCommand === 'web') {
				// Bump version > update environment > update baseHref > build prod > update web resources
				bumpVersion(async (error) => {
					if (error) return;
					const replace = await import('replace-in-file');
					await updateEnvironmentPROD(replace);
					
					updateAngularBaseHref(BASE_HREF);
					// Build web bằng ionic build --prod
					const { exec } = require('child_process');
					//exec('ionic --version', async (err, stdout, stderr) => {
					exec('ionic build --prod', async (err, stdout, stderr) => {
						if (err) {
							console.error(`Error: ${err.message}`);
							return;
						}
						if (stderr) {
							console.error(`stderr: ${stderr}`);
						}
						console.log(`stdout: ${stdout}`);
						// Cập nhật resource web
						await updateWebResouces();
						console.log('✅ Web build & resources updated!');
					});
				});
			} else if (subCommand === 'app') {
				// Build app: tăng version cho Android/iOS và cập nhật environment.prod.ts
				const replace = await import('replace-in-file');
				const results = await Promise.allSettled([
					updateEnvironmentPROD(replace),
					updateAndroidFiles(replace),
					updateIosFiles(replace)
				]);
				console.log(results);
				console.log('✅ App version updated for Android/iOS & environment.prod.ts!');
				console.log('MARKETING_VERSION: ' + MARKETING_VERSION);
				console.log('PROJECT_VERSION: ' + PROJECT_VERSION);
			} else {
				console.log('❌ Unknown build subcommand. Use "build web" or "build app"');
			}
		}
		else {
			console.log('Help: Available commands are listed below. ❓ ');
			console.log('');
			console.log('BACKUP commands: 📁 ');
			console.log('  backup           - Backup both Android and iOS folders');
			console.log('  backup android   - Backup Android folder only');
			console.log('  backup ios       - Backup iOS folder only');
			console.log('');
			console.log('RESTORE commands: 🔄 ');
			console.log('  restore          - Restore both Android and iOS folders');
			console.log('  restore android  - Restore Android folder only');
			console.log('  restore ios      - Restore iOS folder only');
			console.log('');
			console.log('UPDATE commands: 🔧 ');
			console.log('  update           - Update version in all build files');
			console.log('');
			console.log('BUILD commands: 🚀 ');
			console.log('  build web        - Patch web version & update outputPath/baseHref');
			console.log('  build app        - Patch app version for Android/iOS & update environment.prod.ts');
			console.log('');
			console.log('Examples:');
			console.log('  node ./replace.build.js backup');
			console.log('  node ./replace.build.js backup android');
			console.log('  node ./replace.build.js restore ios');
			console.log('  node ./replace.build.js update');
			console.log('  node ./replace.build.js build web');
			console.log('  node ./replace.build.js build app');
			console.log('');
			console.log('');

		}
	} catch (error) {
		console.error('❌ Error:', error.message);
	}
}

getVersion();

if (command) {
	runSpecificCommand(command, args[1]);
} else {
	runSpecificCommand(null, null);
}
