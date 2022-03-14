
import  firebase from 'firebase' 
import 'firebase/firestore'
import 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCp2bKQC6T6d0pOW4VdTIO8EPD86f4pAnA',
  authDomain: 'react-app-cursos-d20a6.firebaseapp.com',
  projectId: 'react-app-cursos-d20a6',
  storageBucket: 'react-app-cursos-d20a6.appspot.com',
  messagingSenderId: '1024987154305',
  appId: '1:1024987154305:web:df558580fe735436838a80',
  measurementId: 'G-8T2KLDN0NQ',
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export { db, googleAuthProvider, firebase }
