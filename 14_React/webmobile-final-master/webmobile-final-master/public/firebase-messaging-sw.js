importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');
const config = {
  apiKey: "AIzaSyDWRME_8dsLBMFAdtARiUVFbz0nOc7MS6E",
  authDomain: "net-nunja-mario-plan.firebaseapp.com",
  databaseURL: "https://net-nunja-mario-plan.firebaseio.com",
  projectId: "net-nunja-mario-plan",
  storageBucket: "net-nunja-mario-plan.appspot.com",
  messagingSenderId: "644995832814",
  appId: "1:644995832814:web:b149d845c4d75b89"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();
// messaging.setBackgroundMessageHandler(function(payload){
//   return self.registration.showNotification(payload.notification.title,JSON.parse(payload.notification.body));
// });

self.addEventListener('push', function(event) {
  // console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);
  const tempbody = JSON.parse(`${event.data.text()}`).notification.body;
  const body = {
    body: JSON.parse(tempbody).body,
  };
  event.waitUntil(self.registration.showNotification(JSON.parse(`${event.data.text()}`).notification.title, body));
});
