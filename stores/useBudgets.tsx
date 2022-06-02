import { Budget } from "types/Budget";
import create from "zustand";

export type BudgetStore = {
  budgets: Budget[] | boolean;
  setBudgets: (budgets: Budget[]) => void;
};

const useBudgets = create<BudgetStore>((set) => ({
  budgets: false,
  setBudgets: (budgets) =>
    set((state) => ({
      ...state,
      budgets: budgets,
    })),
}));

export default useBudgets;
