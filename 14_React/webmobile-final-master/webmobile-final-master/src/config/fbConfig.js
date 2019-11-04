import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Replace this with your own config details
var firebaseConfig = {
  apiKey: "AIzaSyDWRME_8dsLBMFAdtARiUVFbz0nOc7MS6E",
  authDomain: "net-nunja-mario-plan.firebaseapp.com",
  databaseURL: "https://net-nunja-mario-plan.firebaseio.com",
  projectId: "net-nunja-mario-plan",
  storageBucket: "net-nunja-mario-plan.appspot.com",
  messagingSenderId: "644995832814",
  appId: "1:644995832814:web:b149d845c4d75b89"
};
firebase.initializeApp(firebaseConfig);
export default firebase
