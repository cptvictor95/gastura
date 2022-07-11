import EditBudget from "@/components/Budgets/EditBudget/EditBudget";
import { BudgetProvider } from "@/contexts/BudgetContext";
import React from "react";
import Main from "Layout/Main";
import Header from "../../components/Header/Header";
import Container from "Layout/Container";

const Index = () => {
  return (
    <BudgetProvider>
      <Header />
      <Main title="edit">
        <Container>
          <EditBudget />
        </Container>
      </Main>
    </BudgetProvider>
  );
};

export default Index;
