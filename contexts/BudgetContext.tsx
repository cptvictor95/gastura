import React, { useContext, useMemo } from "react";
import { FirebaseCtx } from "@/config/context";
import { Budget } from "types/Budget";
import { User } from "types/User";
import { UserCtx } from "./UserContext";

interface BudgetContext {
  createBudget: (budget: Budget) => Promise<string>;
  getUserBudgets: (userId: string) => Promise<Budget[]>;
  updateBudget: (budgetId: string, budget: Partial<Budget>) => Promise<void>;
  getBudgetById: (uid: string) => Promise<Budget>;
  deleteBudget: (uid: string, user: User) => Promise<void>;
}

export const BudgetCtx = React.createContext<BudgetContext>(null);

export const BudgetProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { firestore } = useContext(FirebaseCtx);
  const { updateUser } = useContext(UserCtx);

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

  const deleteBudget = async (uid: string, user: User) => {
    try {
      if (user) {
        console.log(user);
        const newUserBudgets = user.budgets.filter(
          (budgetId) => budgetId !== uid
        );
        console.log(newUserBudgets);
        await updateUser(user.uid, { budgets: [...newUserBudgets] });

        await firestore.collection("budgets").doc(uid).delete();
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const actions = useMemo(
    () => ({
      createBudget,
      getUserBudgets,
      updateBudget,
      getBudgetById,
      deleteBudget,
    }),
    []
  );
  return <BudgetCtx.Provider value={actions}>{children}</BudgetCtx.Provider>;
};
