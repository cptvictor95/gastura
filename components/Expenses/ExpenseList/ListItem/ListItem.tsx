import { FirebaseCtx } from "@/config/context";
import React, { useContext, useState } from "react";
import { Budget } from "types/Budget";
import { Expense } from "types/Expense";
import styles from "./styles.module.scss";
import { MdEdit, MdDelete } from "react-icons/md";
import { ExpenseCtx } from "@/contexts/ExpenseContext";
import Popup from "reactjs-popup";
import { useRouter } from "next/router";

/**
 * @todo [X] create getBugdetById
 * @todo [X] create deleteExpense
 * @todo [] create updateExpense
 *
 */

const ListItem: React.FC<{ expense: Expense; index: number }> = ({
  expense,
  index,
}) => {
  const router = useRouter();
  const [myBudgetName, setMyBudgetName] = useState<string | undefined>();
  const day = new Date(expense.createdAt).getUTCDate();
  const month = new Date(expense.createdAt).getUTCMonth() + 1;

  const formattedDate = `${day < 10 ? `0${day}` : day}/${
    month < 10 ? `0${month}` : month
  }`;
  const { firestore } = useContext(FirebaseCtx);
  const { deleteExpense } = useContext(ExpenseCtx);
  const [open, setOpen] = useState(false);

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

  const handleDeleteExpense = async (expenseId: string, budgetId: string) => {
    try {
      await deleteExpense(expenseId, budgetId);

      router.reload();
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  };

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
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
        <button
          className={styles.editButton}
          onClick={() => router.push(`/editexpense/${expense.uid}`)}
        >
          <MdEdit />
        </button>
        <button className={styles.deleteButton} onClick={openModal}>
          <MdDelete />
        </button>
        <Popup open={open} modal closeOnEscape onClose={closeModal}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>Tem certeza?</h3>
              <button className={styles.closeBtn} onClick={closeModal}>
                &times;
              </button>
            </div>
            <button
              className={styles.submitButton}
              onClick={() => handleDeleteExpense(expense.uid, expense.budgetId)}
            >
              Sim
            </button>
          </div>
        </Popup>
      </td>
    </tr>
  );
};

export default ListItem;
