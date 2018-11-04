import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

var config = {
  apiKey: "AIzaSyBUCMmdfwHNg96KGuQkA3VaxSi63XN98mI",
  authDomain: "recrewt-8876b.firebaseapp.com",
  databaseURL: "https://recrewt-8876b.firebaseio.com",
  projectId: "recrewt-8876b",
  storageBucket: "recrewt-8876b.appspot.com",
  messagingSenderId: "279346791079"
};
if (!firebase.apps.length) firebase.initializeApp(config);
firebase.firestore().settings({
  timestampsInSnapshots: true
});
const firestore = firebase.firestore();
const auth = firebase.auth();
export { firestore, auth };
