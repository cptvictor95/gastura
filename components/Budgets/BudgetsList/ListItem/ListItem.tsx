import React from "react";
import { Budget } from "types/Budget";
import styles from "./styles.module.scss";
import { MdDelete, MdEdit } from "react-icons/md";
/**
 * @todo create list,
 * @todo create listItem,
 * @todo create html for list.
 * */
const ListItem: React.FC<{ budget: Budget; index: number }> = ({
  budget,
  index,
}) => {
  return (
    <tr className={styles.listItem}>
      <td>{index + 1}</td>
      <td>{budget.name}</td>
      <td>{budget.amount}</td>
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
