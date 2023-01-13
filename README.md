# MetaFoods Branch


## Init project
```
npm i
```


## add platform
```
ionic capacitor add [android/ios]
```
ios/App/App/Info.plist <= fix ITMS-90683: Missing Purpose String in Info.plist



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


## Relese build
```
npm run build-prod
ionic cap build ios --no-build
ionic cap build android --no-build
ionic capacitor open ios
ionic capacitor open android

```

npm run build-prod / ionic cap sync --prod
ionic cap run android --l --external
ionic capacitor run ios -l --external

## Could not find tools.jar. Please check that /Library/Internet Plug-Ins/JavaAppletPlugin.plugin/Contents/Home contains a valid JDK installation.
Goto android folder > gradle.properties file > add below line 
org.gradle.java.home=/Applications/Android Studio.app/Contents/jre/jdk/Contents/Home

ERR_CLEARTEXT_NOT_PERMITTED
app\manifests\AndroidManifest.xml => add <application android:usesCleartextTraffic="true">


http-server -p 8080 -c-1 www


## check new
npm outdated



## Build
Open platforms/ios/ART DMS.xcworkspace
Replace qrscanner-min.js trong xcode


# Wifi remote debug
```
native-run android --app /Users/hungvq/Hung-Data/Projects/ART/ART-DMS/SourceCode/DMS-Client/v0.1.apk --device

```

# Wifi remote debug
```
adb -s ce061716dde60709027e tcpip 5555
adb connect 192.168.1.11:5555
adb devices

ionic cordova emulate android -l
ionic cordova run android --livereload
ionic cordova run ios --livereload
```




