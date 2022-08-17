import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAGEIqxjxWxtFDfvjlZTEYBiQS1TVnsQ7o",
    authDomain: "mymoney-4b244.firebaseapp.com",
    projectId: "mymoney-4b244",
    storageBucket: "mymoney-4b244.appspot.com",
    messagingSenderId: "211140735231",
    appId: "1:211140735231:web:4582b246079e1a83241cca",
    measurementId: "G-N30NGBG0Q0"
  };

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()

// timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, timestamp }