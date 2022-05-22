import useLoggedInUser from "@/hooks/useLoggedInUser";
import React from "react";
import AddBudget from "../Budgets/AddBudget";
import AddExpense from "../Expenses/AddExpense";
import styles from "./styles.module.scss";

const Dashboard = () => {
  const { authState } = useLoggedInUser();
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
          </div>
          <div className={styles.budget}>
            <div className={styles.card}>
              <p>R$</p>
              <p>Renda</p>
            </div>
          </div>
        </div>
        <div className={styles.mainColumns}>
          <AddBudget />
          <AddExpense />
        </div>
      </div>
    );
  }
};

export default Dashboard;
