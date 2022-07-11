import { BudgetCtx } from "@/contexts/BudgetContext";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { Budget } from "types/Budget";
import EditBudgetForm from "./EditBudgetForm";
/**
 *
 * @todo fazer handler para usar funcao do contexto getbudgetbyId
 * @todo usar useEffect para disparar handler quando a pagina renderiza
 * @todo criar um state para guardar os dados do budget e renderizar na tela
 */
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

  return <div>{budget && <EditBudgetForm budget={budget} />}</div>;
};

export default EditBudget;
