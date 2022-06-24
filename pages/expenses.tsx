import ExpenseList from "@/components/Expenses/ExpenseList/ExpenseList";
import Header from "@/components/Header/Header";
import { ExpenseProvider } from "@/contexts/ExpenseContext";
import Main from "Layout/Main";
import React from "react";
import styles from "../styles/pages/Expenses.module.scss";

const Expenses: React.FC = () => {
  return (
    <ExpenseProvider>
      <Header />
      <Main title="Gastos">
        <div className={styles.container}>
          <h2>Tabela de Gastos</h2>
          <ExpenseList />
        </div>
      </Main>
    </ExpenseProvider>
  );
};

export default Expenses;
