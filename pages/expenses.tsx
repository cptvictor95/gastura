import React from "react";
import dynamic from "next/dynamic";
import { ExpenseProvider } from "@/contexts/ExpenseContext";
import Main from "Layout/Main";
import Header from "@/components/Header/Header";

import { BudgetProvider } from "@/contexts/BudgetContext";
import { Container, Flex, Heading } from "@chakra-ui/react";

const ExpenseList = dynamic(
  () => import("@/components/Expenses/ExpenseList/ExpenseList"),
  {
    ssr: false,
  }
);

const Expenses: React.FC = () => {
  return (
    <BudgetProvider>
      <ExpenseProvider>
        <Header />
        <Main title="Gastos">
          <Container maxWidth="4xl">
            <Flex
              direction="column"
              alignItems="center"
              justify="center"
              height="100%"
              gap="12"
              mb="12"
            >
              <Heading textAlign="center" p="2">
                Tabela de Gastos
              </Heading>
              <ExpenseList />
            </Flex>
          </Container>
        </Main>
      </ExpenseProvider>
    </BudgetProvider>
  );
};

export default Expenses;
