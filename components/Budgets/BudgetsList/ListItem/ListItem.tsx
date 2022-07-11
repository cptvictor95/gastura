import React, { useContext, useState } from "react";
import { Budget } from "types/Budget";
import styles from "./styles.module.scss";
import { MdDelete, MdEdit } from "react-icons/md";
import { BudgetCtx } from "@/contexts/BudgetContext";
import router from "next/router";
import Popup from "reactjs-popup";
import useLoggedInUser from "@/hooks/useLoggedInUser";
import { User } from "types/User";
/**
 * @todo create list,
 * @todo create listItem,
 * @todo create html for list.
 * */
const ListItem: React.FC<{ budget: Budget; index: number }> = ({
  budget,
  index,
}) => {
  const { deleteBudget } = useContext(BudgetCtx);
  const [open, setOpen] = useState(false);

  const { user } = useLoggedInUser();
  const handleDeleteBudget = async (uid: string, user: User | false) => {
    try {
      if (user) await deleteBudget(uid, user);

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
  return (
    <tr className={styles.listItem}>
      <td>{index + 1}</td>
      <td>{budget.name}</td>
      <td>{budget.amount}</td>
      <td className={styles.options}>
        <button className={styles.editButton}>
          <MdEdit onClick={() => router.push(`/editbudget/${budget.uid}`)} />
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
              onClick={() => handleDeleteBudget(budget.uid, user)}
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
