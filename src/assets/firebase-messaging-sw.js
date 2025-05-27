importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Same config as your app
firebase.initializeApp({
    apiKey: "AIzaSyC18VtlyrZksjEamwh9b5ZBGsx1k-Ytoto",
    authDomain: "testerp-d3775.firebaseapp.com",
    projectId: "testerp-d3775",
    storageBucket: "testerp-d3775.firebasestorage.app",
    messagingSenderId: "38562934353",
    appId: "1:38562934353:web:7dd0ecdddb0470d5459270",
    measurementId: "G-BDF6HSEE2S"
});

// Retrieve messaging instance
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);

    const notificationTitle = payload.data.title;
    const notificationOptions = {
        body: payload.data.body,
        icon: '/assets/icon/icon.png'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});