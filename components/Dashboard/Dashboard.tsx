import { BudgetCtx } from "@/contexts/BudgetContext";
import { ExpenseCtx } from "@/contexts/ExpenseContext";
import useLoggedInUser from "@/hooks/useLoggedInUser";
import { GetStaticProps } from "next";
import React, { useCallback, useContext, useEffect, useState } from "react";
import useBudgets from "stores/useBudgets";
import useExpenses from "stores/useExpenses";
import { Budget } from "types/Budget";
import { Expense } from "types/Expense";
import AddModal from "../AddModal/AddModal";
import AddBudget from "../Budgets/AddBudget";
import AddExpense from "../Expenses/AddExpenses/AddExpense";
import styles from "./styles.module.scss";

const Dashboard: React.FC = () => {
  const { authState, user } = useLoggedInUser();
  const { getUserBudgets } = useContext(BudgetCtx);
  const { getUserExpenses } = useContext(ExpenseCtx);
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
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
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleUserTotals(budgets, expenses);
  }, [budgets, expenses]);

  useEffect(() => {
    if (user) {
      const handleGetExpenses = async () => {
        const expenses = await getUserExpenses(user.uid);

        setExpenses(expenses);
      };
      const handleGetBudgets = async () => {
        const budgets = await getUserBudgets(user.uid);

        setBudgets(budgets);
      };

      handleGetBudgets();
      handleGetExpenses();
    }
  }, [user]);

  if (authState === "LOADING") return <>Loading...</>;
  else if (authState === "LOGGEDOUT") return <></>;
  else {
    return (
      <div className={styles.container}>
        <div className={styles.balanceContainer}>
          <div className={styles.expense}>
            <div className={styles.card}>
              <p>R${totalExpenses}</p>
              <p>Total de Gastos</p>
            </div>
            <AddModal title="Adicionar gasto">
              <AddExpense />
            </AddModal>
          </div>

          <div className={styles.balance}>
            <div className={styles.card}>
              <p>R${totalBudget - totalExpenses}</p>
              <p>Carteira</p>
            </div>
          </div>

          <div className={styles.budget}>
            <div className={styles.card}>
              <p>R${totalBudget}</p>
              <p>Orçamento total</p>
            </div>
            <AddModal title="Adicionar orçamento">
              <AddBudget />
            </AddModal>
          </div>
        </div>
        <div className={styles.mainColumns}></div>
      </div>
    );
  }
};

export default Dashboard;
