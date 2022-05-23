import { FirebaseCtx } from "@/config/context";
import React, { useContext, useMemo } from "react";
import { Expense } from "types/Expense";

type ExpenseContext = {
  createExpense: (expense: Expense) => Promise<string>;
};

export const ExpenseCtx = React.createContext<ExpenseContext>(null);

export const ExpenseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { firestore } = useContext(FirebaseCtx);

  const createExpense = async (expense: Expense) => {
    try {
      const expenseRef = firestore.collection("expenses").doc();

      const expenseId = expenseRef.id;

      await expenseRef.set({ ...expense, uid: expenseId });

      return expenseId;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const actions = useMemo(() => ({ createExpense }), []);
  return <ExpenseCtx.Provider value={actions}>{children}</ExpenseCtx.Provider>;
};
