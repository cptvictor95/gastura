import EditBudget from "@/components/Budgets/EditBudget/EditBudget";
import { BudgetProvider } from "@/contexts/BudgetContext";
import React from "react";

const Index = () => {
  return (
    <BudgetProvider>
      <EditBudget />
    </BudgetProvider>
  );
};

export default Index;
