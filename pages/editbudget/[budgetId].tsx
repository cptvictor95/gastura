import EditBudget from "@/components/Budgets/EditBudget/EditBudget";
import { BudgetProvider } from "@/contexts/BudgetContext";
import React from "react";
import Main from "Layout/Main";
import Header from "../../components/Header/Header";
import { Container } from "@chakra-ui/react";

const Index = () => {
  return (
    <BudgetProvider>
      <Header />
      <Main title="edit">
        <Container maxWidth="md">
          <EditBudget />
        </Container>
      </Main>
    </BudgetProvider>
  );
};

export default Index;
