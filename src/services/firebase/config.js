import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDuhQeHZTJOaKdqJhasEKq0jLs4Cv6VZwk",
  authDomain: "yokrapp.firebaseapp.com",
  databaseURL: "https://yokrapp.firebaseio.com",
  projectId: "yokrapp",
  storageBucket: "yokrapp.appspot.com",
  messagingSenderId: "303116446076"
};

firebase.initializeApp(config);

export const firebaseAuth = firebase.auth;
export const database = firebase.database();
