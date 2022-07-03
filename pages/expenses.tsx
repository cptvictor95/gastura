import React from "react";
import dynamic from "next/dynamic";
import { ExpenseProvider } from "@/contexts/ExpenseContext";
import Main from "Layout/Main";
import Header from "@/components/Header/Header";
import Container from "Layout/Container";
import { BudgetProvider } from "@/contexts/BudgetContext";

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
          <Container>
            <h2>Tabela de Gastos</h2>
            <ExpenseList />
          </Container>
        </Main>
      </ExpenseProvider>
    </BudgetProvider>
  );
};

export default Expenses;
