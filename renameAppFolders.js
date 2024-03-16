const fs = require('fs');
var replace = require('replace-in-file');
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
