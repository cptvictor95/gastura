import useLoggedInUser from "@/hooks/useLoggedInUser";
import React from "react";
import AddModal from "../AddModal/AddModal";
import AddBudget from "../Budgets/AddBudget";
import AddExpense from "../Expenses/AddExpense";
import styles from "./styles.module.scss";

const Dashboard: React.FC = () => {
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
            <AddModal title="Adicionar gasto">
              <AddExpense />
            </AddModal>
          </div>

          <div className={styles.budget}>
            <div className={styles.card}>
              <p>R$</p>
              <p>Total de Entradas</p>
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
