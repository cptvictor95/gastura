export interface User {
  uid: string;
  name: string;
  email: string;
  password: string;

  budgets: { [budgetId: string]: boolean };
}
