const fs = require('fs');
//var replace = require('replace-in-file');

var package = require('./package.json');

var androidProjectFile = './android/app/build.gradle';
var iosProjectFile = 'ios/App/App.xcodeproj/project.pbxproj';

//1. Rename android folder
try {
  var androidFileData = fs.readFileSync(androidProjectFile, 'utf8');
  var androidRegx = /applicationId "(.*)"/g;
  var androidAppId = androidRegx.exec(androidFileData)[1];

  console.log('Rename android => android.' + androidAppId + '.app');
  fs.renameSync('android', 'android.' + androidAppId + '.app');
} catch (err) {
  console.error(err);
}

//2. Rename ios folder
try {
  var iosFileData = fs.readFileSync(iosProjectFile, 'utf8');
  var iosRegx = /PRODUCT_BUNDLE_IDENTIFIER = (.*);/g;
  var iosAppId = iosRegx.exec(iosFileData)[1];

  console.log('Rename ios => ios.' + iosAppId + '.app');
  fs.renameSync('ios', 'ios.' + iosAppId + '.app');
} catch (err) {
  console.error(err);
}

//3. Rename current ios + android folder
var buildAppId = package.name;
try {
  fs.renameSync('android.' + buildAppId + '.app', 'android');
  fs.renameSync('ios.' + buildAppId + '.app', 'ios');

  console.log('Rename [android/ios]' + buildAppId + ' folders => android and ios.');
} catch (err) {
  console.error(err);
}

//4. Copy custom files to android + ios

//5. Update release version
var buildVersion = package.version; //need to call [npm version patch] to increase version xx.xx.xx
var androidCode = parseInt(buildVersion.replaceAll('.', ''));

const environmentPROD = {
  files: 'src/environments/environment.prod.ts',
  from: /appVersion: '(.*)'/g,
  to: "appVersion: '" + buildVersion + "'",
  allowEmptyPaths: false,
};
const configXML = {
  files: 'config.xml',
  from: /version=\"(.*)\" xmlns=/g,
  to: 'version="' + buildVersion + '" xmlns=',
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
//const webIndex = { files: 'angular.json', from: /index-(.*)\"/g, to: 'v' + buildVersion + '-index.html"', allowEmptyPaths: false };

try {

  import('replace-in-file').then(replace => {
    console.log(replace);
    
    replace.replaceInFile(environmentPROD);
    //replace.replaceInFile(configXML);
    replace.replaceInFile(androidVersion);
    replace.replaceInFile(androidVersionCode);
    replace.replaceInFile(iosVersion);
    replace.replaceInFile(iosProjectVersion);
  });



  //Beta only
  //replace.sync(webOutput);
  //replace.sync(webBaseHref);
  //replace.sync(webIndex);

  console.log('Build version: ' + buildVersion);
} catch (error) {
  console.error('Error occurred:', error);
}
