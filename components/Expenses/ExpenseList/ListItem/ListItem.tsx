import { FirebaseCtx } from "@/config/context";
import React, { useContext, useState } from "react";
import { Budget } from "types/Budget";
import { Expense } from "types/Expense";
import styles from "./styles.module.scss";

import { MdEdit, MdDelete } from "react-icons/md";

/**
 * @todo [X] create getBugdetById
 * @todo [] create deleteExpense
 * @todo [] create updateExpense
 *
 */

const ListItem: React.FC<{ expense: Expense; index: number }> = ({
  expense,
  index,
}) => {
  const [myBudgetName, setMyBudgetName] = useState<string | undefined>();
  const day = new Date(expense.createdAt).getUTCDate();
  const month = new Date(expense.createdAt).getUTCMonth() + 1;

  const formattedDate = `${day < 10 ? `0${day}` : day}/${
    month < 10 ? `0${month}` : month
  }`;
  const { firestore } = useContext(FirebaseCtx);

  const getBudgetById = async (budgetId: string) => {
    try {
      const budgetRef = firestore.collection("budgets").doc(budgetId);

      const budget = await budgetRef.get().then((response) => {
        const data = response.data() as Budget;
        if (!data) console.error("Erro ao encontrar categoria.");
        return data;
      });

      return budget;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleGetBudgetName = async (budgetId: string) => {
    const myBudget = await getBudgetById(budgetId).then((response) => {
      return response.name;
    });

    setMyBudgetName(myBudget);

    return myBudget;
  };

  handleGetBudgetName(expense.budgetId);

  return (
    <tr className={styles.listItem}>
      <td>{index + 1}</td>
      <td>{expense.description}</td>
      <td>R${expense.amount}</td>
      <td>{myBudgetName}</td>
      <td>{formattedDate}</td>
      <td className={styles.options}>
        <button className={styles.editButton}>
          <MdEdit />
        </button>
        <button className={styles.deleteButton}>
          <MdDelete />
        </button>
      </td>
    </tr>
  );
};

export default ListItem;
