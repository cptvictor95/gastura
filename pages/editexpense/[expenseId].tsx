import React from "react";
import EditExpense from "@/components/Expenses/EditExpense/EditExpense";
import { ExpenseProvider } from "@/contexts/ExpenseContext";
import { BudgetProvider } from "@/contexts/BudgetContext";
import Main from "Layout/Main";
import Header from "@/components/Header/Header";

const Index = () => {
  return (
    <BudgetProvider>
      <ExpenseProvider>
        <Header />
        <Main>
          <EditExpense />
        </Main>
      </ExpenseProvider>
    </BudgetProvider>
  );
};

export default Index;
