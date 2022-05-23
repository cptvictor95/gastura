import { BudgetCtx } from "@/contexts/BudgetContext";
import useLoggedInUser from "@/hooks/useLoggedInUser";
import React, { useContext, useEffect, useState } from "react";
import { Budget } from "types/Budget";
import AddModal from "../AddModal/AddModal";
import AddBudget from "../Budgets/AddBudget";
import AddExpense from "../Expenses/AddExpense";
import styles from "./styles.module.scss";

const Dashboard: React.FC = () => {
  const { authState, user } = useLoggedInUser();
  const { getUserBudgets } = useContext(BudgetCtx);
  const [totalBudget, setTotalBudget] = useState(0);

  const handleUserBudget = async (userId: string) => {
    try {
      const budgets = await getUserBudgets(userId);
      let total = 0;

      budgets.map((budget) => (total += budget.amount));

      setTotalBudget(total);
      return total;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user) {
      handleUserBudget(user.uid);
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
              <p>R$</p>
              <p>Total de Gastos</p>
            </div>
            <AddModal title="Adicionar gasto">
              <AddExpense />
            </AddModal>
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
