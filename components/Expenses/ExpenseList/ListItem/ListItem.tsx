import { FirebaseCtx } from "@/config/context";
import React, { useContext, useState } from "react";
import { Budget } from "types/Budget";
import { Expense } from "types/Expense";

import { MdEdit, MdDelete } from "react-icons/md";
import { ExpenseCtx } from "@/contexts/ExpenseContext";
import { useRouter } from "next/router";
import {
  IconButton,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  Td,
  Tr,
} from "@chakra-ui/react";

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

  const { isOpen, onOpen, onClose } = useDisclosure();

  handleGetBudgetName(expense.budgetId);

  return (
    <Tr>
      <Td>{index + 1}</Td>
      <Td>{expense.description}</Td>
      <Td>R${expense.amount}</Td>
      <Td>{myBudgetName}</Td>
      <Td>{formattedDate}</Td>
      <Td>
        <Flex gap="4">
          <IconButton
            icon={<MdEdit />}
            size="sm"
            height="8"
            w="max-content"
            bgColor="beige.100"
            aria-label="Edit Expense"
            onClick={() => router.push(`/editexpense/${expense.uid}`)}
          />

          <IconButton
            w="max-content"
            size="sm"
            height="8"
            icon={<MdDelete />}
            bgColor="beige.100"
            aria-label="Delete Expense"
            onClick={onOpen}
          />
        </Flex>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent bgColor="green.900">
            <ModalHeader color="beige.100" textAlign="center">
              Deseja excluir este gasto?
            </ModalHeader>
            <ModalCloseButton color="beige.100" />

            <ModalBody>
              <Flex as="div" p="4" gap="6">
                <Button
                  bgColor="beige.100"
                  onClick={() =>
                    handleDeleteExpense(expense.uid, expense.budgetId)
                  }
                >
                  Sim
                </Button>

                <Button
                  bgColor="beige.100"
                  onClick={() => router.push(`/editexpense/${expense.uid}`)}
                >
                  Editar
                </Button>
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Td>
    </Tr>
  );
};

export default ListItem;
