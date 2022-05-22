import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { User } from "types/User";
import { FirebaseCtx } from "../config/context";
type AuthState = "LOGGEDOUT" | "LOGGEDIN" | "LOADING";

const useLoggedInUser = () => {
  const firebase = useContext(FirebaseCtx);
  const [user, setUser] = useState<User | null | false>(null);
  const firebaseUserId = firebase.user ? firebase.user.uid : null;
  const router = useRouter();

  const handleUserLogout = async () => {
    try {
      await firebase.auth.signOut();

      await router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (firebase.user === false) {
      setUser(false);
    }
  }, [firebase.user]);

  useEffect(() => {
    if (firebaseUserId) {
      firebase.firestore
        .collection("users")
        .doc(firebaseUserId)
        .get()
        .then((doc) => {
          const data = doc.data() as any;

          setUser(data);
        })
        .catch(() => {
          setUser(false);
        });
    }
  }, [firebase.user]);

  return {
    authState: (user === false
      ? "LOGGEDOUT"
      : user === null
      ? "LOADING"
      : "LOGGEDIN") as AuthState,
    user,
    handleUserLogout,
  };
};

export default useLoggedInUser;
