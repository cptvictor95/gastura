import React from "react";
import { Expense } from "types/Expense";
import styles from "./styles.module.scss";
/**
 * @todo
 * create getBugdetById
 */
const ListItem: React.FC<{ expense: Expense; index: number }> = ({
  expense,
  index,
}) => {
  const day = new Date(expense.createdAt).getUTCDate();
  const month = new Date(expense.createdAt).getUTCMonth() + 1;

  const formattedDate = `${day < 10 ? `0${day}` : day} / ${
    month < 10 ? `0${month}` : month
  }`;

  return (
    <li className={styles.listItem}>
      <p>{index + 1}</p>
      <p>{expense.description}</p>
      <p>R${expense.amount}</p>
      <p>{expense.budgetId}</p>
      <p>{formattedDate}</p>
      <div className={styles.options}>
        <button className={styles.editButton}>ed</button>
        <button className={styles.deleteButton}>de</button>
      </div>
    </li>
  );
};

export default ListItem;
