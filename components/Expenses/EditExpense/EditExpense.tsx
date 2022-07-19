import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ExpenseCtx } from "@/contexts/ExpenseContext";
import { Expense } from "types/Expense";
import EditExpenseForm from "./EditExpenseForm";

const EditExpense = () => {
  const router = useRouter();
  const expenseId = router.query?.expenseId as string;
  const { getExpenseById } = useContext(ExpenseCtx);
  const [expense, setExpense] = useState<Expense>(null);

  const handleGetExpenseById = async (expenseId: string) => {
    if (expenseId) {
      const expense = await getExpenseById(expenseId);

      setExpense(expense);
    }
  };
  console.log(expense);

  useEffect(() => {
    handleGetExpenseById(expenseId);
  }, [expenseId]);

  return <div>{expense && <EditExpenseForm expense={expense} />}</div>;
};

export default EditExpense;
