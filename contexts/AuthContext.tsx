import React, { useContext, useMemo } from "react";
import { FirebaseCtx } from "config/context";

export interface AuthContext {
  login: (email: string, password: string) => Promise<string>;
}

export const AuthCtx = React.createContext<AuthContext>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { auth } = useContext(FirebaseCtx);

  const login = async (email: string, password: string) => {
    try {
      const res = await auth.signInWithEmailAndPassword(email, password);

      const user = res.user;

      return user.uid;
    } catch (error) {
      throw error;
    }
  };

  const actions = useMemo(
    () => ({
      login,
    }),
    []
  );

  return <AuthCtx.Provider value={actions}>{children}</AuthCtx.Provider>;
};
