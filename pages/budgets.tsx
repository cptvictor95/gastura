import Header from "@/components/header/Header";
import Main from "Layout/Main";
import React from "react";
import styles from "../styles/pages/Budgets.module.scss";

const Budgets = () => {
  return (
    <>
      <Header />
      <Main title="Entradas">
        <div className={styles.container}>
          <h2>Tabela de Entradas</h2>
        </div>
      </Main>
    </>
  );
};

export default Budgets;
