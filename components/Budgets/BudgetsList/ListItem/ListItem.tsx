import React, { useContext } from "react";
import { Budget } from "types/Budget";

import { MdDelete, MdEdit } from "react-icons/md";
import { BudgetCtx } from "@/contexts/BudgetContext";
import router from "next/router";

import useLoggedInUser from "@/hooks/useLoggedInUser";
import { User } from "types/User";
import {
  Flex,
  IconButton,
  ModalBody,
  Td,
  Tr,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

const ListItem: React.FC<{ budget: Budget; index: number }> = ({
  budget,
  index,
}) => {
  const { deleteBudget } = useContext(BudgetCtx);

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

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Tr>
      <Td>{index + 1}</Td>
      <Td>{budget.name}</Td>
      <Td>{budget.amount}</Td>
      <Td>
        <Flex gap="4" width="0">
          <IconButton
            icon={<MdEdit />}
            aria-label="Edit Budget"
            size="sm"
            height="8"
            w="max-content"
            bgColor="beige.100"
            onClick={() => router.push(`/editbudget/${budget.uid}`)}
          />

          <IconButton
            aria-label="delete Expense"
            icon={<MdDelete />}
            size="sm"
            height="8"
            w="max-content"
            bgColor="red.800"
            _hover={{
              filter: "auto",
              brightness: "80%",
            }}
            onClick={onOpen}
          />
        </Flex>

        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent bgColor="green.900">
            <ModalHeader color="beige.100" textAlign="center">
              Deseja excluir sua entrada?
            </ModalHeader>
            <ModalCloseButton />

            <ModalBody>
              <Flex as="div" p="4" gap="6">
                <Button
                  bgColor="beige.100"
                  onClick={() => handleDeleteBudget(budget.uid, user)}
                >
                  Sim
                </Button>
                <Button
                  bgColor="beige.100"
                  onClick={() => router.push(`/editbudget/${budget.uid}`)}
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
