# Getting Started

## Init project
```
npm i
```


## add platform
```
ionic capacitor add [android/ios]
```
ios/App/App/Info.plist <= fix ITMS-90683: Missing Purpose String in Info.plist
Open platforms/ios/ART DMS.xcworkspace
Replace qrscanner-min.js trong xcode


## resource for capacitor
```
sudo npm install -g cordova-res

cordova-res --copy
cordova-res --splash --copy
cordova-res ios --splash --skip-config --copy
cordova-res ios --splash --copy
```

Android: 
Icon => Project view\ androi\ app \Right Click \Context Menu go to New->Image Asset\new logo

## PWA Icons gen
```
ngx-pwa-icons -i "./resources/icon.png" 
ngx-pwa-icons -i ".src/assets/logos/logo-in-square.png"
```




# Developing

## debug
```
ionic cap run android --l --external
ionic capacitor run ios -l --external

adb -s ce061716dde60709027e tcpip 5555
adb connect 192.168.1.11:5555
adb devices

http-server -p 8080 -c-1 www
```

## Update npm
```
npm outdated
```

## Update Ionic
```

```




# Deployment

## build
```
npm run build-prod / ionic cap sync --prod
ionic cap build ios --no-build
ionic cap build android --no-build
ionic capacitor open ios
ionic capacitor open android

```



## iOS App Store Deployment
```
ionic capacitor open ios
```

## Android Play Store Deployment
```
ionic capacitor open android
```

## Deploying a Progressive Web App





# Troubleshooting

## Could not find tools.jar. Please check that /Library/Internet Plug-Ins/JavaAppletPlugin.plugin/Contents/Home contains a valid JDK installation.
Goto android folder > gradle.properties file > add below line 
org.gradle.java.home=/Applications/Android Studio.app/Contents/jre/jdk/Contents/Home

## ERR_CLEARTEXT_NOT_PERMITTED
app\manifests\AndroidManifest.xml => add <application android:usesCleartextTraffic="true">



## Android Gradle plugin requires Java 11 to run. You are currently using Java 1.8.
Preferences → Build, Execution, Deployment → Build Tools → Gradle → *Gradle JDK

## npm ERR! Git working directory not clean
```
npm config set git-tag-version=false
```
```
