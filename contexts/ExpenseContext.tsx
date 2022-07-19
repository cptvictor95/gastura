import { FirebaseCtx } from "@/config/context";
import React, { useContext, useMemo } from "react";
import { Expense } from "types/Expense";
import { BudgetCtx } from "./BudgetContext";

type ExpenseContext = {
  createExpense: (expense: Expense) => Promise<string>;
  getUserExpenses: (userId: string) => Promise<Expense[]>;
  deleteExpense: (uid: string, budgetId: string) => Promise<void>;
  getExpenseById: (uid: string) => Promise<Expense>;
  updateExpense: (
    expenseId: string,
    expense: Partial<Expense>
  ) => Promise<void>;
};

export const ExpenseCtx = React.createContext<ExpenseContext>(null);

export const ExpenseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { firestore } = useContext(FirebaseCtx);
  const { getUserBudgets, getBudgetById, updateBudget } = useContext(BudgetCtx);

  // Refactor return to be the same object registered inside firestore for UI upload
  const createExpense = async (expense: Expense) => {
    try {
      const expenseRef = firestore.collection("expenses").doc();

      const expenseId = expenseRef.id;

      await expenseRef.set({ ...expense, uid: expenseId });

      return expenseId;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const updateExpense = async (
    expenseId: string,
    expense: Partial<Expense>
  ) => {
    try {
      if (!expenseId) {
        throw new Error("Gasto não encontrado");
      }

      const expenseRef = firestore.collection("expenses").doc(expenseId);

      await expenseRef.update({ ...expense });
    } catch (error) {
      console.error(error);
      throw new Error("");
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
      throw new Error(error.message);
    }
  };

  const deleteExpense = async (uid: string, budgetId: string) => {
    try {
      // remove deleted expenseId from budget.expenses
      const budget = await getBudgetById(budgetId);

      const newBudgetExpenses = budget.expenses.filter(
        (expenseId) => expenseId !== uid
      );

      await updateBudget(budget.uid, { expenses: [...newBudgetExpenses] });

      // delete expense from collection
      await firestore.collection("expenses").doc(uid).delete();
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const getExpenseById = async (uid: string) => {
    try {
      if (!uid) console.error("Gasto não encontrado");

      const expense = await firestore
        .collection("expenses")
        .doc(uid)
        .get()
        .then((doc) => doc.data() as Expense);

      return expense;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const actions = useMemo(
    () => ({
      createExpense,
      getUserExpenses,
      deleteExpense,
      getExpenseById,
      updateExpense,
    }),
    []
  );

  return <ExpenseCtx.Provider value={actions}>{children}</ExpenseCtx.Provider>;
};
