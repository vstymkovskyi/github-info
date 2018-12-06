/*
 * *
 *  * Created by vstymkovskyi on 12/5/18 10:27 PM.
 *
 */

import firebaseApp from 'firebase/app';
import 'firebase/auth';

const FirebaseConfig = {
  apiKey: "AIzaSyC6kQgCBnAQkAfectc-X8Xf2DylRzJAn2Q",
  authDomain: "github-search-13ce5.firebaseapp.com",
  databaseURL: "https://github-search-13ce5.firebaseio.com",
  projectId: "github-search-13ce5",
  storageBucket: "github-search-13ce5.appspot.com",
  messagingSenderId: "17423385318"
};

firebaseApp.initializeApp(FirebaseConfig);

export const googleProvider = new firebaseApp.auth.GoogleAuthProvider();
export const githubProvider = new firebaseApp.auth.GithubAuthProvider();
export const firebaseAuth = firebaseApp.auth();

export default firebaseApp;