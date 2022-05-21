import React from "react";

export const ExpenseCtx = React.createContext(null);

export const ExpenseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <ExpenseCtx.Provider value={{}}>{children}</ExpenseCtx.Provider>;
};
