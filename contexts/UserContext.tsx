import React, { useContext, useMemo } from "react";
import { FirebaseCtx } from "config/context";
import { User } from "types/User";

export interface UserContext {
  createUser: (user: Partial<User>) => Promise<string>;
  updateUser: (userId: string, user: Partial<User>) => Promise<void>;
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

      await userRef.set({
        ...user,
        budgets: {},
      });

      return userId;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const updateUser = async (userId: string, user: Partial<User>) => {
    try {
      if (!userId) {
        console.error("Usuário não encontrado");
      }

      const userRef = firestore.collection("users").doc(userId);

      await userRef.update({ ...user });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const actions = useMemo(
    () => ({
      createUser,
      updateUser,
    }),
    []
  );

  return <UserCtx.Provider value={actions}>{children}</UserCtx.Provider>;
};
