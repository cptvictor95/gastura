import { Expense } from "types/Expense";
import create from "zustand";

export type ExpenseStore = {
  expenses: Expense[] | boolean;
  setExpenses: (expenses: Expense[]) => void;
};

const useExpenses = create<ExpenseStore>((set) => ({
  expenses: false,
  setExpenses: (expenses) =>
    set((state) => ({
      ...state,
      expenses: expenses,
    })),
}));

export default useExpenses;
