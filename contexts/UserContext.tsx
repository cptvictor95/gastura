import React, { useContext, useMemo } from "react";
import { FirebaseCtx } from "config/context";
import { User } from "types/User";

export interface UserContext {
  createUser: (user: Partial<User>) => Promise<string>;
}

export const UserCtx = React.createContext<UserContext>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { firestore } = useContext(FirebaseCtx);

  const createUser = async (user: Partial<User>) => {
    try {
      const userRef = firestore.collection("users").doc(user.uid);

      const userId = userRef.id;

      await userRef.set(user);

      return userId;
    } catch (error) {
      console.error(error);
    }
  };

  const actions = useMemo(
    () => ({
      createUser,
    }),
    []
  );

  return <UserCtx.Provider value={actions}>{children}</UserCtx.Provider>;
};
