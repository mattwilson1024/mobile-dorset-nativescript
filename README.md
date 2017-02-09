# mobile-dorset-nativescript
Cross platform demo app built with NativeScript, Angular and Firebase. 

-----

This app was built with two goals in mind. 

1. To serve as a demo app for my Mobile Dorset talk: "Mobile development with NativeScript & Angular"
2. To learn new things!

-----

*Important Note*: This app requires a Firebase account to run, but no Firebase config is committed. 
To set up firebase and be able to run the app, follow these steps:
* Sign up for a Firebase account
* In the Firebase console, create a new application with Android and iOS
* Download firebase config files for Android and iOS and, as per the setup steps at https://github.com/EddyVerbruggen/nativescript-plugin-firebase, place the files at:
    /app/App_Resources/Android/google-services.json
    /app/App_Resources/iOS/GoogleService-Info.plist

-----

To run the app:

```
npm install
npm run ios-dev
npm run android-dev
```

-----

The app was built with NativeScript 2.4, but I would like to update it to 2.5 in the future.

------

To add icon resources to action bar:
- Download png and resize to 44px for iOS / 64px for Android
- Use http://nsimage.nativescript.rocks/ to download iOS / Android resources
- Add to /app/App_Resources for each platform.
- Use as follows:

```
<ActionItem (tap)="createTopic()" ios.position="right" ios:icon="res://sort.png" android:icon="res://sort">
```

- Note: you need to uninstall the app and run it again for it to include the resource, livereload etc doesn't work.