import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDpeepZO11MauYu2OGREXEyx6p5Hr_Vp_I",
  authDomain: "codingtest-4c868.firebaseapp.com",
  databaseURL: "https://codingtest-4c868-default-rtdb.firebaseio.com",
  projectId: "codingtest-4c868",
  storageBucket: "codingtest-4c868.appspot.com",
  messagingSenderId: "1094912568119",
  appId: "1:1094912568119:web:d06daf9b63b60ebff608b2",
  measurementId: "G-H7WDC0LPSN",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// Check if user exists if not create a user
export const createUserProfileDocument = async (userAuth: any, additionalData?: any) => {
  if (!userAuth) return;

  const userReference = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userReference.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userReference.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log(error);
    }
  }
  return userReference;
};
const fire = firebase;
export { fire };
