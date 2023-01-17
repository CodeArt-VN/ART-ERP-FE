&nbsp; white space
# Init project
npm i

## resource for capacitor
```
cordova-res --copy
cordova-res --splash --copy

Android: 
Icon => Project view\ androi\ app \Right Click \Context Menu go to New->Image Asset\new logo

```

ionic capacitor add [android/ios]

ios/App/App/Info.plist <= fix ITMS-90683: Missing Purpose String in Info.plist

# Relese build


npm run build-prod / ionic cap sync --prod
ionic cap build ios --no-build
ionic cap build android --no-build




ionic capacitor open ios
ionic capacitor open android



ionic cap run android --l --external
ionic capacitor run ios -l --external

# Could not find tools.jar. Please check that /Library/Internet Plug-Ins/JavaAppletPlugin.plugin/Contents/Home contains a valid JDK installation.
Goto android folder > gradle.properties file > add below line 
org.gradle.java.home=/Applications/Android Studio.app/Contents/jre/jdk/Contents/Home


PWA Icons gen
ngx-pwa-icons -i "./resources/icon.png" 
ngx-pwa-icons -i ".src/assets/logos/logo-in-square.png"

http-server -p 8080 -c-1 www




## resource for capacitor
```
sudo npm install -g cordova-res
cordova-res ios --splash --skip-config --copy
cordova-res ios --splash --copy
```





## check new
npm outdated


npm install typescript@">=4.0.0 <4.2.0"


# Build
```
ionic cordova platform rm ios
--deploy-url=/BOOKING --base-href=/BOOKING

ionic build --prod --deploy-url=/BOOKING --base-href=/BOOKING

ng build --deploy-url /BOOKING/ --base-href /BOOKING/ --prod
ng build --deploy-url /BS/ --base-href /BS/ --prod

ionic cordova build android --prod --release
keytool -genkey -v -keystore ART-DMS-release-key.keystore -alias art_dms -keyalg RSA -keysize 2048 -validity 10000
pass hoilamchi
```
/Users/hungvq/Hung-Data/Projects/ART/ART-DMS/SourceCode/DMS-Client/ART-DMS-release-key.keystore






# Publish new version

```
Update version trong 
    /config.xml
    /src/environments/environment.prod.ts

ionic cordova build android --prod --release

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ART-DMS-release-key.keystore /Users/hungvq/Hung-Data/Projects/ART/ART-DMS/SourceCode/DMS-Client/platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk art_dms

/Users/hungvq/Hung-Data/android/build-tools/28.0.3/zipalign -v 4 /Users/hungvq/Hung-Data/Projects/ART/ART-DMS/SourceCode/DMS-Client/platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk ART-DMS-v0.15.7.apk

ionic cordova build ios --prod --release
Open platforms/ios/ART DMS.xcworkspace
Replace qrscanner-min.js trong xcode
Go to https://appstoreconnect.apple.com/WebObjects/iTunesConnect.woa => create Version
Menu/Product/Archive => Distribute App


ionic build --prod --release
```


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



font-size:(.+)([0-9])px;
font-size:$1.$2rem;


ERR_CLEARTEXT_NOT_PERMITTED
app\manifests\AndroidManifest.xml => add <application android:usesCleartextTraffic="true">