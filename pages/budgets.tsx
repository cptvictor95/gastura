import Main from "Layout/Main";
import React from "react";
import Header from "../components/Header/Header";
import { BudgetProvider } from "@/contexts/BudgetContext";

import { Container, Flex, Heading } from "@chakra-ui/react";
import dynamic from "next/dynamic";

const BudgetList = dynamic(
  () => import("@/components/Budgets/BudgetsList/BudgetList"),
  {
    ssr: false,
  }
);

const BudgetPage: React.FC = () => {
  return (
    <BudgetProvider>
      <Header />
      <Main title="Orçamento">
        <Container maxWidth="4xl">
          <Flex
            as="section"
            direction="column"
            alignItems="center"
            justify="center"
            height="100%"
            width="100%"
            gap="12"
          >
            <Heading textAlign="center" p="2">
              Lista de orçamento
            </Heading>
            <BudgetList />
          </Flex>
        </Container>
      </Main>
    </BudgetProvider>
  );
};

export default BudgetPage;
