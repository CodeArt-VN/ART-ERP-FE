const fs = require('fs');
//var replace = require('replace-in-file');

var packageContent = require('./package.json');

var androidProjectFile = './android/app/build.gradle';
var iosProjectFile = 'ios/App/App.xcodeproj/project.pbxproj';



function backupAndroidFolder() {
  return new Promise((resolve, reject) => {
    try {
      var androidFileData = fs.readFileSync(androidProjectFile, 'utf8');
      var androidRegx = /applicationId "(.*)"/g;
      var androidAppId = androidRegx.exec(androidFileData)[1];
    
      fs.renameSync('android', 'android.' + androidAppId + '.app');
      console.log('Rename android => android.' + androidAppId + '.app');
      resolve();
    } catch (err) {
      console.log('Android not found.', err);
      reject('Android not found.');
    }
  });
}

function backupIosFolder() {
  return new Promise((resolve, reject) => {
    try {
      var iosFileData = fs.readFileSync(iosProjectFile, 'utf8');
      var iosRegx = /PRODUCT_BUNDLE_IDENTIFIER = (.*);/g;
      var iosAppId = iosRegx.exec(iosFileData)[1];
    
      fs.renameSync('ios', 'ios.' + iosAppId + '.app');
      console.log('Rename ios => ios.' + iosAppId + '.app');
      resolve();
    } catch (err) {
      console.log('ios not found.', err);
      reject('ios not found.');
    }
  });
}

async function restoreAndroidAndIosFolder() {
  var buildAppId = packageContent.name;
  try {
    fs.renameSync('android.' + buildAppId + '.app', 'android');
    console.log('Rename android.' + buildAppId + ' folders => android.');
  } catch (err) {
    console.error(err);
  }

  try {
    fs.renameSync('ios.' + buildAppId + '.app', 'ios');
    console.log('Rename ios.' + buildAppId + ' folders => ios.');
  } catch (err) {
    console.error(err);
  }
}


var buildVersion = packageContent.version; //need to call [npm version patch] to increase version xx.xx.xx
console.log('Build version: ' + buildVersion);
var androidCode = parseInt(buildVersion.replaceAll('.', ''));

const environmentPROD = {
  files: 'src/environments/environment.prod.ts',
  from: /appVersion: '(.*)'/g,
  to: "appVersion: '" + buildVersion + "'",
  allowEmptyPaths: false,
};

const androidVersionCode = {
  files: androidProjectFile,
  from: /versionCode (.*)/g,
  to: 'versionCode ' + androidCode + '00',
  allowEmptyPaths: false,
};
const androidVersion = {
  files: androidProjectFile,
  from: /versionName "(.*)"/g,
  to: 'versionName "' + buildVersion + '"',
  allowEmptyPaths: false,
};

const iosVersion = {
  files: iosProjectFile,
  from: /MARKETING_VERSION = (.*)/g,
  to: 'MARKETING_VERSION = ' + buildVersion + ';',
  allowEmptyPaths: false,
};
const iosProjectVersion = {
  files: iosProjectFile,
  from: /CURRENT_PROJECT_VERSION = (.*)/g,
  to: 'CURRENT_PROJECT_VERSION = ' + androidCode + '00' + ';',
  allowEmptyPaths: false,
};

const webOutput = {
  files: 'angular.json',
  from: /outputPath\": \"(.*)\",/g,
  to: 'outputPath": "www/v' + buildVersion + '",',
  allowEmptyPaths: false,
};
const webBaseHref = {
  files: 'angular.json',
  from: /baseHref\": \"(.*)\",/g,
  to: 'baseHref": "v' + buildVersion + '/",',
  allowEmptyPaths: false,
};


Promise.all([backupAndroidFolder(), backupIosFolder()]).then(() => {
  console.log('Backup android + ios folders.');
})
.catch((err) => {
  console.error(err);
})
.finally(() => {
  restoreAndroidAndIosFolder().then(() => {
    console.log('Restore android + ios folders.');

    import('replace-in-file').then(replace => {
      try { replace.replaceInFile(environmentPROD); } catch { console.error('Error updating environmentPROD'); }
      try { replace.replaceInFile(androidVersion); } catch { console.error('Error updating androidVersion'); }
      try { replace.replaceInFile(androidVersionCode); } catch { console.error('Error updating androidVersionCode'); }
      try { replace.replaceInFile(iosVersion); } catch { console.error('Error updating iosVersion'); }
      try { replace.replaceInFile(iosProjectVersion); } catch { console.error('Error updating iosProjectVersion'); }

      console.log('Build version updated.');
    });

  });
});

