import * as React from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export interface FirebaseContext {
  auth: firebase.auth.Auth;
  firestore: firebase.firestore.Firestore;
}

export const FirebaseCtx = React.createContext<FirebaseContext | null>(null);

// Check dotenv config vars
if (!process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY)
  throw new Error("Missing firebase env variables");

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

try {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  console.log("Firebase conectado!");
} catch (error) {
  console.error("Erro ao conectar com o Firebase.");
}

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const auth = firebase.auth();
  const firestore = firebase.firestore();

  const state = { auth, firestore };

  return <FirebaseCtx.Provider value={state}>{children}</FirebaseCtx.Provider>;
};
