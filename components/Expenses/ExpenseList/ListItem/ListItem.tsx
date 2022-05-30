import React from "react";
import { Expense } from "types/Expense";
import styles from "./styles.module.scss";

const ListItem: React.FC<{ expense: Expense }> = ({ expense }) => {
  const day = new Date(expense.createdAt).getUTCDate();
  const month = new Date(expense.createdAt).getUTCMonth() + 1;

  const formattedDate = `${day} / ${month - 10 ? `0${month}` : month}`;
  console.log({
    day,
    month,
    formattedDate,
  });
  return (
    <div className={styles.listItem}>
      <p>{expense.description}</p>
      <p>R${expense.amount}</p>
      <p>{formattedDate}</p>
    </div>
  );
};

export default ListItem;
