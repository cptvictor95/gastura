import { ExpenseCtx } from "@/contexts/ExpenseContext";
import useLoggedInUser from "@/hooks/useLoggedInUser";
import React, { useContext, useEffect, useState } from "react";
import ListItem from "./ListItem/ListItem";

const ExpenseList = () => {
  const { getUserExpenses } = useContext(ExpenseCtx);
  const { user } = useLoggedInUser();
  const [expenses, setExpenses] = useState([]);

  const handleGetUserExpenses = async (userId) => {
    const expenses = await getUserExpenses(userId);

    console.log("expenses handler", expenses);
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
