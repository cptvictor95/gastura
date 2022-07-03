import Main from "Layout/Main";
import React from "react";
import Header from "../components/Header/Header";
import { BudgetProvider } from "@/contexts/BudgetContext";
import BudgetList from "@/components/Budgets/BudgetsList/BudgetList";
import Container from "Layout/Container";

const BudgetPage: React.FC = () => {
  return (
    <BudgetProvider>
      <Header />
      <Main title="Orçamento">
        <Container>
          <h2>Orçamento</h2>
          <BudgetList />
        </Container>
      </Main>
    </BudgetProvider>
  );
};

export default BudgetPage;
