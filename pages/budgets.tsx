import Main from "Layout/Main";
import React from "react";
import Header from "../components/Header/Header";
import { BudgetProvider } from "@/contexts/BudgetContext";
import BudgetList from "@/components/Budgets/BudgetsList/BudgetList";

import { Container, Heading } from "@chakra-ui/react";

const BudgetPage: React.FC = () => {
  return (
    <BudgetProvider>
      <Header />
      <Main title="Orçamento">
        <Container maxWidth="3xl">
          <Heading textAlign="center" p="2">
            Lista de orçamento
          </Heading>
          <BudgetList />
        </Container>
      </Main>
    </BudgetProvider>
  );
};

export default BudgetPage;
