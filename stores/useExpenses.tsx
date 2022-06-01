import { Expense } from "types/Expense";
import create from "zustand";

export type ExpenseStore = {
  expenses: Expense[];
  setExpenses: (expenses: Expense[]) => void;
};

const useExpenses = create<ExpenseStore>((set) => ({
  expenses: [],
  setExpenses: (expenses) =>
    set((state) => ({
      ...state,
      expenses: expenses,
    })),
}));

export default useExpenses;
