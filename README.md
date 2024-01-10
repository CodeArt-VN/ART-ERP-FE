# Getting Started

node ./replace.translate.js

git submodule update --init --recursive
git submodule foreach 'git checkout main || :'
git submodule foreach git pull origin main


## Init project
```
npm i

npm run build-prod / ionic cap sync --prod
ionic cap build ios --no-build
ionic cap build android --no-build
ionic capacitor open ios
ionic capacitor open android

```


## add platform
```
npm i @capacitor/core
npm i -D @capacitor/cli

npm i @capacitor/android @capacitor/ios

npm i @capacitor/app@latest...
npm i @capacitor/push-notifications@4.1.2

ionic capacitor add android
ionic capacitor add ios

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

## Push Notification Android

go to Firebase Console Project Overview\Project setting  tab general download file google-service.json
then pass android \ app \ google-service.json

Import Icon notification Project view\ android\ capacitor-push-notifications\res\ \Right Click \Context Menu go to New->Image Asset
at Icon Type option  choose  Notification Icon

go to file android \capacitor-push-notifications \java \PushNotificationsPlugin.java at line 232 
edit "int pushIcon = R.drawable.ic_stat_notifications"

## Push Notification IOS
go to deleloper.apple.com/account/resources/authkeys/list new key - check Apple push Notification  service (APNs) - Download
go to Firebase Console Project Overview\Project setting  tab Cloud Messaging upload file APNs Authentication Key 
go to Firebase Console Project Overview\Project setting  tab general download file GoogleService-Info.json
then pass App \ app \ GoogleService-Info.json 
App/Podfile  edit 
target 'App' do
    capacitor_pods
    pod 'Firebase/Messaging'
end
npx cap update ios

open xcode edit AppDelegate.swift

    import UIKit
    import Capacitor
    import Firebase

    @UIApplicationMain
    class AppDelegate: UIResponder, UIApplicationDelegate 
    {

        var window: UIWindow?

        func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
            // Override point for customization after application launch.
            FirebaseApp.configure()
            return true
        }
        ...

        func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
            Messaging.messaging().apnsToken = deviceToken
            Messaging.messaging().token(completion: { (token, error) in
            if let error = error {
                NotificationCenter.default.post(name: .capacitorDidFailToRegisterForRemoteNotifications, object: error)
            } else if let token = token {
                NotificationCenter.default.post(name: .capacitorDidRegisterForRemoteNotifications, object: token)
            }
            })
        }

        func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
            NotificationCenter.default.post(name: .capacitorDidFailToRegisterForRemoteNotifications, object: error)
        }
    }

targets App -> tab Signing & capabilities add  Capability - search push notifications 

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
