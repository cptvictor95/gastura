import React, { useContext, useEffect, useState } from "react";
import { BudgetCtx } from "@/contexts/BudgetContext";
import { useRouter } from "next/router";
import { Budget } from "types/Budget";
import EditBudgetForm from "./EditBudgetForm";

const EditBudget = () => {
  const router = useRouter();
  const budgetId = router.query?.budgetId as string;
  const { getBudgetById } = useContext(BudgetCtx);
  const [budget, setBudget] = useState<Budget>(null);

  const handleGetBudgetById = async (budgetId: string) => {
    const budget = await getBudgetById(budgetId);
    console.log(budget);

    setBudget(budget);
  };

  useEffect(() => {
    let mounted = true;

    if (mounted && budgetId) handleGetBudgetById(budgetId);
    return () => {
      mounted = false;
    };
  }, [budgetId]);

  return <>{budget && <EditBudgetForm budget={budget} />}</>;
};

export default EditBudget;
