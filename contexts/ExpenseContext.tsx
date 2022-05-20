import React from "react";

export const ExpenseCtx = React.createContext({});

export const ExpenseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <ExpenseCtx.Provider value={{}}>{children}</ExpenseCtx.Provider>;
};
