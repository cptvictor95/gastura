import { BudgetCtx } from "@/contexts/BudgetContext";
import { ExpenseCtx } from "@/contexts/ExpenseContext";
import useLoggedInUser from "@/hooks/useLoggedInUser";
import { GetStaticProps } from "next";
import React, { useCallback, useContext, useEffect, useState } from "react";
import useBudgets from "stores/useBudgets";
import useExpenses from "stores/useExpenses";
import { Budget } from "types/Budget";
import { Expense } from "types/Expense";
import AddBudget from "../Budgets/AddBudget";
import AddExpense from "../Expenses/AddExpenses/AddExpense";
import styles from "./styles.module.scss";

const Dashboard: React.FC = () => {
  const { authState, user } = useLoggedInUser();
  const { getUserBudgets } = useContext(BudgetCtx);
  const { getUserExpenses } = useContext(ExpenseCtx);
  const [totalBudget, setTotalBudget] = useState<number | boolean>(false);
  const [totalExpenses, setTotalExpenses] = useState<number | boolean>(false);
  const [userWallet, setUserWallet] = useState<number | boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const { budgets, setBudgets } = useBudgets();
  const { expenses, setExpenses } = useExpenses();

  const handleUserTotals = async (budgets: Budget[], expenses: Expense[]) => {
    try {
      let totalBudget = 0;
      let totalExpenses = 0;

      budgets.map((budget) => (totalBudget += budget.amount));

      expenses.map((expense) => (totalExpenses += expense.amount));

      setTotalBudget(totalBudget);
      setTotalExpenses(totalExpenses);
      if (expenses) {
        setUserWallet(totalBudget - totalExpenses);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (typeof budgets !== "boolean" && typeof expenses !== "boolean") {
      handleUserTotals(budgets, expenses);
      setIsLoading(false);
    }
  }, [budgets, expenses]);

  useEffect(() => {
    if (user) {
      const handleGetBudgets = async () => {
        const budgets = await getUserBudgets(user.uid);

        setBudgets(budgets);
      };
      const handleGetExpenses = async () => {
        const expenses = await getUserExpenses(user.uid);

        setExpenses(expenses);
      };

      handleGetBudgets();
      handleGetExpenses();
    }
  }, [user]);

  useEffect(() => {
    if (authState === "LOADING") {
      setIsLoading(true);
    }
  }, [authState]);

  return (
    <div className={styles.container}>
      <div className={styles.balanceContainer}>
        <div className={styles.expense}>
          <div className={styles.card}>
            <p>R${isLoading ? "SKELETON" : totalExpenses}</p>
            <p>Total de Gastos</p>
          </div>

          <AddExpense />
        </div>

        <div className={styles.balance}>
          <div className={styles.card}>
            <p>R${isLoading ? "SKELETON" : userWallet}</p>
            <p>Carteira</p>
          </div>
        </div>

        <div className={styles.budget}>
          <div className={styles.card}>
            <p>R${isLoading ? "SKELETON" : totalBudget}</p>
            <p>Orçamento total</p>
          </div>

          <AddBudget />
        </div>
      </div>
      <div className={styles.mainColumns}></div>
    </div>
  );
};

export default Dashboard;
