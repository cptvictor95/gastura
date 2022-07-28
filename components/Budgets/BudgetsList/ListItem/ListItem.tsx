import React, { useContext, useState } from "react";
import { Budget } from "types/Budget";

import { MdDelete, MdEdit } from "react-icons/md";
import { BudgetCtx } from "@/contexts/BudgetContext";
import router from "next/router";
import Popup from "reactjs-popup";
import useLoggedInUser from "@/hooks/useLoggedInUser";
import { User } from "types/User";
import { Table, Td, Tr } from "@chakra-ui/react";
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
    <Tr>
      <Td>{index + 1}</Td>
      <Td>{budget.name}</Td>
      <Td>{budget.amount}</Td>
      <Td>
        <button onClick={() => router.push(`/editbudget/${budget.uid}`)}>
          <MdEdit />
        </button>
        <button onClick={openModal}>
          <MdDelete />
        </button>
        <Popup open={open} modal closeOnEscape onClose={closeModal}>
          <div>
            <div>
              <h3>Tem certeza?</h3>
              <button onClick={closeModal}>&times;</button>
            </div>
            <button onClick={() => handleDeleteBudget(budget.uid, user)}>
              Sim
            </button>
          </div>
        </Popup>
      </Td>
    </Tr>
  );
};

export default ListItem;
