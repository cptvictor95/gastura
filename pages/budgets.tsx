import Main from "Layout/Main";
import React from "react";
import styles from "../styles/pages/Budgets.module.scss";
import Header from "../components/Header/Header";
import { BudgetProvider } from "@/contexts/BudgetContext";

const Budgets: React.FC = () => {
  return (
    <BudgetProvider>
      <Header />
      <Main title="Orçamento">
        <div className={styles.container}>
          <h2>Orçamento</h2>
        </div>
      </Main>
    </BudgetProvider>
  );
};

export default Budgets;
