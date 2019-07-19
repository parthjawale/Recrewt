import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

var config = {
  apiKey: "<enter firebase apiKey>",
  authDomain: "<enter firebase authDomain>",
  databaseURL: "<enter firebase databaseURL>",
  projectId: "<enter firebase projectId>",
  storageBucket: "<enter firebase storageBucket>",
  messagingSenderId: "<enter firebase messagingSenderId>"
};
if (!firebase.apps.length) firebase.initializeApp(config);
firebase.firestore().settings({
  timestampsInSnapshots: true
});
const firestore = firebase.firestore();
const auth = firebase.auth();
export { firestore, auth };
