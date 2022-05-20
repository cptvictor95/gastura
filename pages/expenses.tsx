import Header from "@/components/header/Header";
import Main from "Layout/Main";
import React from "react";
import styles from "../styles/pages/Expenses.module.scss";

const Expenses = () => {
  return (
    <>
      <Header />
      <Main title="Gastos">
        <div className={styles.container}>
          <h2>Tabela de Gastos</h2>
        </div>
      </Main>
    </>
  );
};

export default Expenses;
