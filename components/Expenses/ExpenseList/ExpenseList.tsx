import { ExpenseCtx } from "@/contexts/ExpenseContext";
import useLoggedInUser from "@/hooks/useLoggedInUser";
import React, { useContext, useEffect, useState } from "react";
import { Expense } from "types/Expense";
import ListItem from "./ListItem/ListItem";
import styles from "./styles.module.scss";

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
    <ul className={styles.table}>
      <li className={styles.tableHead}>
        <p>#</p>
        <p>Nome</p>
        <p>Valor</p>
        <p>Categoria</p>
        <p>Data</p>
        <p>Opcao</p>
      </li>
      {expenses.map((expense, index) => {
        return <ListItem expense={expense} key={expense.uid} index={index} />;
      })}
    </ul>
  );
};

export default ExpenseList;
