import Main from "Layout/Main";
import React from "react";
import styles from "../styles/pages/Budgets.module.scss";
import Header from "../components/Header/Header";

const Budgets = () => {
  return (
    <>
      <Header />
      <Main title="Orçamento">
        <div className={styles.container}>
          <h2>Orçamento</h2>
        </div>
      </Main>
    </>
  );
};

export default Budgets;
