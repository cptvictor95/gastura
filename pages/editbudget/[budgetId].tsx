import EditBudget from "@/components/Budgets/EditBudget/EditBudget";
import { BudgetProvider } from "@/contexts/BudgetContext";
import React from "react";
import Main from "Layout/Main";
import Header from "../../components/Header/Header";
import { Container, Flex } from "@chakra-ui/react";

const Index = () => {
  return (
    <BudgetProvider>
      <Header />
      <Main title="edit">
        <Container maxWidth="md">
          <Flex alignItems="center" justify="center" height="100%" gap="12">
            <EditBudget />
          </Flex>
        </Container>
      </Main>
    </BudgetProvider>
  );
};

export default Index;
