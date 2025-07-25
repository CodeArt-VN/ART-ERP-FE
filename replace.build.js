const fs = require('fs');
const packageContent = require('./package.json');
const androidProjectFile = './android/app/build.gradle';
const iosProjectFile = 'ios/App/App.xcodeproj/project.pbxproj';

//need to call [npm version patch] to increase version xx.xx.xx
const MARKETING_VERSION = packageContent.version;
const buildAppId = packageContent.name;
const PROJECT_VERSION = parseInt(MARKETING_VERSION.replaceAll('.', ''));

console.log('buildAppId: ' + buildAppId);
console.log('MARKETING_VERSION: ' + MARKETING_VERSION);
console.log('PROJECT_VERSION: ' + PROJECT_VERSION);

// Command line arguments để chạy function riêng lẻ
const args = process.argv.slice(2);
const command = args[0];


let androidFileData = '';
let iosFileData = '';

function backupAndroidFolder() {
  return new Promise((resolve, reject) => {
    try {
      androidFileData = fs.readFileSync(androidProjectFile, 'utf8');
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
      iosFileData = fs.readFileSync(iosProjectFile, 'utf8');
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



async function updateAndroidVersion(replace) {
  try {
    if (!fs.existsSync(androidProjectFile)) {
      throw new Error('File not found: ' + androidProjectFile);
    } else {
      const androidVersion = {
        files: androidProjectFile,
        from: /versionName "(.*)"/g,
        to: 'versionName "' + MARKETING_VERSION + '"',
        allowEmptyPaths: false,
      };
      await replace.replaceInFile(androidVersion);
      return 'updateAndroidVersion';
    }
  } catch (err) {
    throw new Error('Error updating androidVersion');
  }
}

async function updateAndroidVersionCode(replace) {
  try {
    if (!fs.existsSync(androidProjectFile)) {
      throw new Error('File not found: ' + androidProjectFile);
    } else {
      const androidVersionCode = {
        files: androidProjectFile,
        from: /versionCode (.*)/g,
        to: 'versionCode ' + PROJECT_VERSION + '00',
        allowEmptyPaths: false,
      };
      await replace.replaceInFile(androidVersionCode);
      return 'updateAndroidVersionCode';
    }
  } catch (err) {
    throw new Error('Error updating androidVersionCode');
  }
}

async function updateIosVersion(replace) {
  if (!fs.existsSync(iosProjectFile)) {
    throw new Error('File not found: ' + iosProjectFile);
  } else {
    try {
      const marketingVersionValue = MARKETING_VERSION;
      const iosVersion = {
        files: iosProjectFile,
        from: /MARKETING_VERSION = (.*);/g,
        to: 'MARKETING_VERSION = ' + marketingVersionValue + ';',
        allowEmptyPaths: false,
      };
      await replace.replaceInFile(iosVersion);
      return 'updateIosVersion';
    } catch (err) {
      throw new Error('Error updating iosVersion');
    }
  }
}

async function updateIosProjectVersion(replace) {
  if (!fs.existsSync(iosProjectFile)) {
    throw new Error('File not found: ' + iosProjectFile);
  } else {
    try {
      const iosProjectVersion = {
        files: iosProjectFile,
        from: /CURRENT_PROJECT_VERSION = (.*);/g,
        to: 'CURRENT_PROJECT_VERSION = ' + PROJECT_VERSION + '00' + ';',
        allowEmptyPaths: false,
      };
      await replace.replaceInFile(iosProjectVersion);
      return 'updateIosProjectVersion';
    } catch (err) {
      throw new Error('Error updating iosProjectVersion');
    }
  }
}

function updateWebOutput(replace) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync('angular.json')) {
      reject('File not found: angular.json');
    } else {
      try {
        const webOutput = {
          files: 'angular.json',
          from: /outputPath\": \"(.*)\",/g,
          to: 'outputPath": "www/v' + MARKETING_VERSION + '",',
          allowEmptyPaths: false,
        };
        replace.replaceInFile(webOutput);
        resolve('updateWebOutput');
      } catch (err) {
        reject('Error updating webOutput');
      }
    }
  });
}

function updateWebBaseHref(replace) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync('angular.json')) {
      reject('File not found: angular.json');
    } else {
      try {
        const webBaseHref = {
          files: 'angular.json',
          from: /baseHref\": \"(.*)\",/g,
          to: 'baseHref": "v' + MARKETING_VERSION + '/",',
          allowEmptyPaths: false,
        };
        replace.replaceInFile(webBaseHref);
        resolve('updateWebBaseHref');
      } catch (err) {
        reject('Error updating webBaseHref');
      }
    }
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
    else {
      console.log('❌ Unknown command. Available commands:');
      console.log('');
      console.log('📁 BACKUP commands:');
      console.log('  backup           - Backup both Android and iOS folders');
      console.log('  backup android   - Backup Android folder only');
      console.log('  backup ios       - Backup iOS folder only');
      console.log('');
      console.log('🔄 RESTORE commands:');
      console.log('  restore          - Restore both Android and iOS folders');
      console.log('  restore android  - Restore Android folder only');
      console.log('  restore ios      - Restore iOS folder only');
      console.log('');
      console.log('🔧 UPDATE commands:');
      console.log('  update           - Update version in all build files');
      console.log('');
      console.log('Examples:');
      console.log('  node ./replace.build.js backup');
      console.log('  node ./replace.build.js backup android');
      console.log('  node ./replace.build.js restore ios');
      console.log('  node ./replace.build.js update');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
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

// Nếu có command line argument, chỉ chạy function đó
if (command) {
  const subCommand = args[1];
  console.log('Running command:', command, subCommand || '');
  runSpecificCommand(command, subCommand);
} else {
  // Chạy toàn bộ như trước
  runFullProcess();
}
