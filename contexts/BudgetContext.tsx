import { FirebaseCtx } from "@/config/context";
import React, { useContext, useMemo } from "react";
import { Budget } from "types/Budget";

interface BudgetContext {
  createBudget: ({ name, amount }: Budget) => Promise<string>;
  getBudgets: () => Promise<Budget[]>;
}

export const BudgetCtx = React.createContext<BudgetContext>(null);

export const BudgetProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { firestore } = useContext(FirebaseCtx);

  const getBudgets = async () => {
    try {
      const budgets = await firestore
        .collection("budgets")
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
      getBudgets,
    }),
    []
  );
  return <BudgetCtx.Provider value={actions}>{children}</BudgetCtx.Provider>;
};
