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
    <table className={styles.table}>
      <tr className={styles.tableRow}>
        <th>#</th>
        <th>Nome</th>
        <th>Valor</th>
        <th>Categoria</th>
        <th>Data</th>
        <th>Opção</th>
      </tr>
      {expenses.map((expense, index) => {
        return <ListItem expense={expense} key={expense.uid} index={index} />;
      })}
    </table>
  );
};

export default ExpenseList;
