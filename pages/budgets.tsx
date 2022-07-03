import Main from "Layout/Main";
import React from "react";
import Header from "../components/Header/Header";
import { BudgetProvider } from "@/contexts/BudgetContext";
import Container from "Layout/Container";

const Budgets: React.FC = () => {
  return (
    <BudgetProvider>
      <Header />
      <Main title="Orçamento">
        <Container>
          <h2>Orçamento</h2>
        </Container>
      </Main>
    </BudgetProvider>
  );
};

export default Budgets;
