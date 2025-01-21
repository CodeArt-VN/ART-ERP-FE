const fs = require('fs');
const packageContent = require('./package.json');
const androidProjectFile = './android/app/build.gradle';
const iosProjectFile = 'ios/App/App.xcodeproj/project.pbxproj';

//need to call [npm version patch] to increase version xx.xx.xx
const buildVersion = packageContent.version;
const buildAppId = packageContent.name;
const androidCode = parseInt(buildVersion.replaceAll('.', ''));

console.log('buildAppId: ' + buildAppId);
console.log('Build version: ' + buildVersion);


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

async function restoreAndroidAndIosFolder() {

  try {
    fs.renameSync('android.' + buildAppId + '.app', 'android');
    console.log('Rename android.' + buildAppId + ' folders => android.');
  } catch (err) {
    console.error('Error restoring android folder.');
  }

  try {
    fs.renameSync('ios.' + buildAppId + '.app', 'ios');
    console.log('Rename ios.' + buildAppId + ' folders => ios.');
  } catch (err) {
    console.error('Error restoring ios folder.');
  }
}
function updateEnvironmentPROD(replace) {
  return new Promise((resolve, reject) => {
    try {
      let filePath = 'src/environments/environment.prod.ts';
      if (!fs.existsSync(filePath)) {
        reject('File not found: ' + filePath);
      } else {
        const environmentPROD = {
          files: filePath,
          from: /appVersion: '(.*)'/g,
          to: "appVersion: '" + buildVersion + "'",
          allowEmptyPaths: false,
        };
        replace.replaceInFile(environmentPROD);
        resolve('updateEnvironmentPROD');
      }
    } catch (err) {
      reject('Error updating environmentPROD');
    }
  });
}



function updateAndroidVersion(replace) {
  return new Promise((resolve, reject) => {
    try {
      if (!fs.existsSync(androidProjectFile)) {
        reject('File not found: ' + androidProjectFile);
      } else {
        const androidVersion = {
          files: androidProjectFile,
          from: /versionName "(.*)"/g,
          to: 'versionName "' + buildVersion + '"',
          allowEmptyPaths: false,
        };
        replace.replaceInFile(androidVersion);
        resolve('updateAndroidVersion');
      }
    } catch (err) {
      reject('Error updating androidVersion');
    }
  });
}

function updateAndroidVersionCode(replace) {
  return new Promise((resolve, reject) => {
    try {
      if (!fs.existsSync(androidProjectFile)) {
        reject('File not found: ' + androidProjectFile);
      } else {
        const androidVersionCode = {
          files: androidProjectFile,
          from: /versionCode (.*)/g,
          to: 'versionCode ' + androidCode + '00',
          allowEmptyPaths: false,
        };
        replace.replaceInFile(androidVersionCode);
        resolve('updateAndroidVersionCode');
      }
    } catch (err) {
      reject('Error updating androidVersionCode');
    }
  });
}

function updateIosVersion(replace) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(iosProjectFile)) {
      reject('File not found: ' + iosProjectFile);
    } else {
      try {
        const iosVersion = {
          files: iosProjectFile,
          from: /MARKETING_VERSION = (.*)/g,
          to: 'MARKETING_VERSION = ' + buildVersion + ';',
          allowEmptyPaths: false,
        };
        replace.replaceInFile(iosVersion);
        resolve('updateIosVersion');
      } catch (err) {
        reject('Error updating iosVersion');
      }
    }
  });
}

function updateIosProjectVersion(replace) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(iosProjectFile)) {
      reject('File not found: ' + iosProjectFile);
    } else {
      try {
        const iosProjectVersion = {
          files: iosProjectFile,
          from: /CURRENT_PROJECT_VERSION = (.*)/g,
          to: 'CURRENT_PROJECT_VERSION = ' + androidCode + '00' + ';',
          allowEmptyPaths: false,
        };
        replace.replaceInFile(iosProjectVersion);
        resolve('updateIosProjectVersion');
      } catch (err) {
        reject('Error updating iosProjectVersion');
      }
    }
  });
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
          to: 'outputPath": "www/v' + buildVersion + '",',
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
          to: 'baseHref": "v' + buildVersion + '/",',
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


Promise.all([backupAndroidFolder(), backupIosFolder()]).then(() => {
  console.log('Backup android + ios folders.');
})
  .catch((err) => { })
  .finally(() => {
    restoreAndroidAndIosFolder()
      .then(() => { })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        import('replace-in-file').then(replace => {

          Promise.allSettled([
            updateEnvironmentPROD(replace),
            updateAndroidVersion(replace),
            updateAndroidVersionCode(replace),
            updateIosVersion(replace),
            updateIosProjectVersion(replace),
            // updateWebOutput(replace),
            // updateWebBaseHref(replace)
          ]).then((results) => {
            console.log(results);
          }).finally(() => {
            console.log('Build version: ' + buildVersion);
            console.log('------------------------------------');
          });
        });
      });

  });
