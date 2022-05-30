import { FirebaseCtx } from "@/config/context";
import React, { useContext, useMemo } from "react";
import { Expense } from "types/Expense";
import { BudgetCtx } from "./BudgetContext";

type ExpenseContext = {
  createExpense: (expense: Expense) => Promise<string>;
  getUserExpenses: (userId: string) => Promise<Expense[]>;
};

export const ExpenseCtx = React.createContext<ExpenseContext>(null);

export const ExpenseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { firestore } = useContext(FirebaseCtx);
  const { getUserBudgets } = useContext(BudgetCtx);

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

  const getUserExpenses = async (userId: string) => {
    try {
      const budgets = await getUserBudgets(userId);

      const expenses = await firestore
        .collection("expenses")
        .get()
        .then((res) => {
          return res.docs.map((doc) => {
            const data = doc.data() as Expense;

            if (!data) console.error("Erro ao buscar lista de gastos.");

            return data;
          });
        });

      const userExpenses = expenses.filter((expense) =>
        budgets.some((budget) => budget.uid === expense.budgetId)
      );

      return userExpenses;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const actions = useMemo(() => ({ createExpense, getUserExpenses }), []);

  return <ExpenseCtx.Provider value={actions}>{children}</ExpenseCtx.Provider>;
};
