import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

const settings = { timestampsInSnapshots: true };

var config = {
  apiKey: "AIzaSyBZgLqWjx_XqFSOP_-KcZ3NERtxHhbKFVA",
  authDomain: "justbeep-0-2.firebaseapp.com",
  databaseURL: "https://justbeep-0-2.firebaseio.com",
  projectId: "justbeep-0-2",
  storageBucket: "justbeep-0-2.appspot.com",
  messagingSenderId: "1088572560682"
};

firebase.initializeApp(config);
export default firebase;  
