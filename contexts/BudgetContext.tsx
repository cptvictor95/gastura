import { FirebaseCtx } from "@/config/context";
import React, { useContext, useMemo } from "react";
import { Budget } from "types/Budget";

interface BudgetContext {
  createBudget: ({ name, amount }: Budget) => Promise<string>;
  getUserBudgets: (userId: string) => Promise<Budget[]>;
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

            if (!data) console.error("Erro ao buscar lista de usuários.");

            return data;
          });
        });

      return budgets;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const createBudget = async (budget: Budget) => {
    try {
      const budgetRef = firestore.collection("budgets").doc();

      const budgetId = budgetRef.id;

      await budgetRef.set(budget);

      return budgetId;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const actions = useMemo(
    () => ({
      createBudget,
      getUserBudgets,
    }),
    []
  );
  return <BudgetCtx.Provider value={actions}>{children}</BudgetCtx.Provider>;
};
