import * as React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export interface FirebaseContext {
  auth: firebase.auth.Auth;
  firestore: firebase.firestore.Firestore;
  user: firebase.User | null | false;
  getAuthUser(): Promise<firebase.User["uid"]>;
}

export const FirebaseCtx = React.createContext<FirebaseContext>(
  {} as FirebaseContext
);

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
  const [user, setUser] = React.useState<firebase.User | null | false>(null);

  const getAuthUser = () => {
    const userId = auth.currentUser?.uid;
    return userId
      ? Promise.resolve(userId)
      : Promise.race([
          new Promise<string>((resolve) => {
            const uns = auth.onAuthStateChanged((user) => {
              if (user) {
                resolve(user.uid);
                uns();
              }
            });
          }),
          new Promise<never>((_resolve, reject) =>
            setTimeout(
              () => reject(new Error("No authorized user available")),
              5000
            )
          ),
        ]);
  };

  // Auth Listener
  React.useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      if (!user) {
        setUser(false);
      } else {
        setUser(user);
      }
    });
  }, [user]);

  const state = React.useMemo(
    () => ({
      auth,
      firestore,
      user,
      getAuthUser,
    }),
    [user]
  );

  return <FirebaseCtx.Provider value={state}>{children}</FirebaseCtx.Provider>;
};
