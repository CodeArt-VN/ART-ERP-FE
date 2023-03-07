var replace = require('replace-in-file');
var package = require("./package.json");
var buildVersion = package.version; //need to call [npm version patch] to increase version xx.xx.xx 
var androidCode = parseInt(buildVersion.replaceAll('.',''));

const environmentPROD = { files: 'src/environments/environment.prod.ts', from: /appVersion: '(.*)'/g, to: "appVersion: '" + buildVersion + "'", allowEmptyPaths: false };
const configXML = { files: 'config.xml', from: /version=\"(.*)\" xmlns=/g, to: 'version="' + buildVersion + '" xmlns=', allowEmptyPaths: false };

const androidVersionCode = { files: 'android/app/build.gradle', from: /versionCode (.*)/g, to: 'versionCode '+androidCode+'', allowEmptyPaths: false };
const androidVersion = { files: 'android/app/build.gradle', from: /versionName "(.*)"/g, to: 'versionName "' + buildVersion + '"', allowEmptyPaths: false };

const iosVersion = { files: 'ios/App/App.xcodeproj/project.pbxproj', from: /MARKETING_VERSION = (.*)/g, to: "MARKETING_VERSION = " + buildVersion + ";", allowEmptyPaths: false };
const iosProjectVersion = { files: 'ios/App/App.xcodeproj/project.pbxproj', from: /CURRENT_PROJECT_VERSION = (.*)/g, to: "CURRENT_PROJECT_VERSION = " + buildVersion + ";", allowEmptyPaths: false };



try {
    replace.sync(environmentPROD);
    replace.sync(configXML);
    replace.sync(androidVersion);
    replace.sync(androidVersionCode);
    replace.sync(iosVersion);
    replace.sync(iosProjectVersion);

    console.log('Build version set: ' + buildVersion);
}
catch (error) {
    console.error('Error occurred:', error);
}
