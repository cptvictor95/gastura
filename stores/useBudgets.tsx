import { Budget } from "types/Budget";
import create from "zustand";

export type BudgetStore = {
  budgets: Budget[];
  setBudgets: (budgets: Budget[]) => void;
};

const useBudgets = create<BudgetStore>((set) => ({
  budgets: [],
  setBudgets: (budgets) =>
    set((state) => ({
      ...state,
      budgets: budgets,
    })),
}));

export default useBudgets;
