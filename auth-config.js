// Accounts are powered by Firebase (free tier). Until this is filled in,
// the sign-up and login pages show a "not switched on yet" notice.
//
// To switch accounts on:
//  1. Create a project at https://console.firebase.google.com
//  2. Build > Authentication > Sign-in method > enable "Email/Password"
//  3. Build > Firestore Database > create database, then paste the rules from README.md
//  4. Project settings > Your apps > add a Web app, and copy its config object below
//  5. Authentication > Settings > Authorized domains > add moneymanmusa.github.io
//
// These values are meant to be public; security comes from the Firestore rules.
window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyAj8xfSeVjZW9X00WK1EazkRjKdSFOWpzQ",
  authDomain: "path-after-highschool.firebaseapp.com",
  projectId: "path-after-highschool",
  storageBucket: "path-after-highschool.firebasestorage.app",
  messagingSenderId: "702361394761",
  appId: "1:702361394761:web:29554a4f6343606b6ae998",
  measurementId: "G-R8MDM9V53S"
};
