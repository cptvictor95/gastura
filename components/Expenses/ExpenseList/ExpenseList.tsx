import Loading from "@/components/Loading/Loading";
import { ExpenseCtx } from "@/contexts/ExpenseContext";
import useLoggedInUser from "@/hooks/useLoggedInUser";
import React, { useContext, useEffect, useState } from "react";
import { Expense } from "types/Expense";
import AddExpense from "../AddExpenses/AddExpense";
import ListItem from "./ListItem/ListItem";
import styles from "./styles.module.scss";

const ExpenseList: React.FC = () => {
  const { getUserExpenses } = useContext(ExpenseCtx);
  const { user } = useLoggedInUser();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleGetUserExpenses = async (userId: string) => {
    const expenses = await getUserExpenses(userId);

    setExpenses(expenses);
    setIsLoading(false);
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
      {isLoading ? (
        <div className={styles.loadingContainer}>
          <Loading />
        </div>
      ) : (
        expenses.map((expense, index) => {
          return <ListItem expense={expense} key={expense.uid} index={index} />;
        })
      )}

      {!isLoading && expenses.length === 0 && (
        <div className={styles.emptyMessage}>
          <p>Nenhum gasto adicionado até agora.</p>
          <AddExpense />
        </div>
      )}
    </table>
  );
};

export default ExpenseList;
