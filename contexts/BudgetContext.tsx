import { FirebaseCtx } from "@/config/context";
import React, { useContext, useMemo } from "react";
import useBudgets from "stores/useBudgets";
import { Budget } from "types/Budget";

interface BudgetContext {
  createBudget: ({ name, amount }: Budget) => Promise<string>;
  getUserBudgets: (userId: string) => Promise<Budget[]>;
  updateBudget: (budgetId: string, budget: Partial<Budget>) => Promise<void>;
  getBudgetById: (uid: string) => Promise<Budget>;
}

export const BudgetCtx = React.createContext<BudgetContext>(null);

export const BudgetProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { firestore } = useContext(FirebaseCtx);

  const getUserBudgets = async (userId: string) => {
    try {
      const budgets = await firestore
        .collection("budgets")
        .where("userId", "==", userId)
        .get()
        .then((res) => {
          return res.docs.map((doc) => {
            const data = doc.data() as Budget;

            if (!data) console.error("Erro ao buscar lista de orçamentos.");

            return data;
          });
        });

      return budgets;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // Refactor return to be the same object registered inside firestore for UI upload
  const createBudget = async (budget: Budget) => {
    try {
      const budgetRef = firestore.collection("budgets").doc();

      const budgetId = budgetRef.id;

      await budgetRef.set({ ...budget, uid: budgetId });

      return budgetId;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const updateBudget = async (budgetId: string, budget: Partial<Budget>) => {
    try {
      if (!budgetId) {
        console.error("Orçamento não encontrado");
      }

      const budgetRef = firestore.collection("budgets").doc(budgetId);

      await budgetRef.update({ ...budget });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getBudgetById = async (uid: string) => {
    try {
      if (!uid) console.error("Orçamento não encontrado");

      const budget = await firestore
        .collection("budgets")
        .doc(uid)
        .get()
        .then((doc) => doc.data() as Budget);

      return budget;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const actions = useMemo(
    () => ({
      createBudget,
      getUserBudgets,
      updateBudget,
      getBudgetById,
    }),
    []
  );
  return <BudgetCtx.Provider value={actions}>{children}</BudgetCtx.Provider>;
};
