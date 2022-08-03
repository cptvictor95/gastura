import React from "react";
import EditExpense from "@/components/Expenses/EditExpense/EditExpense";
import { ExpenseProvider } from "@/contexts/ExpenseContext";
import { BudgetProvider } from "@/contexts/BudgetContext";
import Main from "Layout/Main";
import Header from "@/components/Header/Header";
import { Container, Flex } from "@chakra-ui/react";

const Index = () => {
  return (
    <BudgetProvider>
      <ExpenseProvider>
        <Header />
        <Main>
          <Container maxWidth="md">
            <Flex
              alignItems="center"
              justify="center"
              height="100%"
              gap="12"
              mt="2"
            >
              <EditExpense />
            </Flex>
          </Container>
        </Main>
      </ExpenseProvider>
    </BudgetProvider>
  );
};

export default Index;
