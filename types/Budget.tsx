export type Budget = {
  uid?: string;
  name: string;
  amount: number;
  userId: string;
  expenses: { [budgetId: string]: boolean };
};
