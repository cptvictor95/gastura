import { BudgetCtx } from "@/contexts/BudgetContext";
import { ExpenseCtx } from "@/contexts/ExpenseContext";
import useLoggedInUser from "@/hooks/useLoggedInUser";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Budget } from "types/Budget";
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

  const handleUserBudget = async (userId: string) => {
    try {
      const budgets = await getUserBudgets(userId);
      let total = 0;

      budgets.map((budget) => (total += budget.amount));

      setTotalBudget(total);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUserExpenses = async (userId: string) => {
    try {
      const expenses = await getUserExpenses(userId);
      let total = 0;

      expenses.map((expense) => (total += expense.amount));

      setTotalExpenses(total);
    } catch (error) {
      console.error(error);
    }
  };

  const handlers = useCallback(() => {
    if (user) {
      handleUserBudget(user.uid);
      handleUserExpenses(user.uid);
    }
  }, [user]);

  handlers();

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
