import { ExpenseCtx } from "@/contexts/ExpenseContext";
import useLoggedInUser from "@/hooks/useLoggedInUser";
import React, { useContext, useEffect, useState } from "react";
import { Expense } from "types/Expense";
import ListItem from "./ListItem/ListItem";

const ExpenseList: React.FC = () => {
  const { getUserExpenses } = useContext(ExpenseCtx);
  const { user } = useLoggedInUser();
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const handleGetUserExpenses = async (userId: string) => {
    const expenses = await getUserExpenses(userId);

    setExpenses(expenses);
  };

  useEffect(() => {
    if (user !== null && user !== false) handleGetUserExpenses(user.uid);
  }, [user]);

  return (
    <div>
      {expenses.map((expense) => {
        return <ListItem expense={expense} key={expense.uid} />;
      })}
    </div>
  );
};

export default ExpenseList;
