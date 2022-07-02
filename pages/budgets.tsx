import Main from "Layout/Main";
import React from "react";
import styles from "../styles/pages/Budgets.module.scss";
import Header from "../components/Header/Header";
import { BudgetProvider } from "@/contexts/BudgetContext";
import BudgetList from "@/components/Budgets/BudgetsList/BudgetList";

const BudgetPage: React.FC = () => {
  return (
    <BudgetProvider>
      <Header />
      <Main title="Orçamento">
        <div className={styles.container}>
          <h2>Orçamento</h2>
          <BudgetList />
        </div>
      </Main>
    </BudgetProvider>
  );
};

export default BudgetPage;
