import React from "react";

export const BudgetCtx = React.createContext({});

export const BudgetProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <BudgetCtx.Provider value={{}}>{children}</BudgetCtx.Provider>;
};
