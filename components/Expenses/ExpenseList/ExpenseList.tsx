import Loading from "@/components/Loading/Loading";
import { ExpenseCtx } from "@/contexts/ExpenseContext";
import useLoggedInUser from "@/hooks/useLoggedInUser";
import {
  Button,
  Container,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { Expense } from "types/Expense";
import AddExpense from "../AddExpenses/AddExpense";
import ListItem from "./ListItem/ListItem";

const ExpenseList: React.FC = () => {
  const { getUserExpenses } = useContext(ExpenseCtx);
  const { user } = useLoggedInUser();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleGetUserExpenses = async (userId: string) => {
    const expenses = await getUserExpenses(userId);

    setExpenses(expenses);
    setIsLoading(false);
  };

  useEffect(() => {
    if (user !== null && user !== false) handleGetUserExpenses(user.uid);
  }, [user]);

  if (isLoading)
    return (
      <Container centerContent maxW="md">
        <Loading />
      </Container>
    );

  return expenses.length !== 0 ? (
    <TableContainer borderRadius="6px" pb="4" bgColor="rgba(0,0,0,0.5)">
      <Table variant="striped" colorScheme="dgreen">
        <Thead bgColor="black">
          <Tr fontWeight="semibold">
            <Th color="beige.100">#</Th>
            <Th color="beige.100">Nome</Th>
            <Th color="beige.100"> Valor</Th>
            <Th color="beige.100">Categoria</Th>
            <Th color="beige.100">Data</Th>
            <Th color="beige.100">Opção</Th>
          </Tr>
        </Thead>
        <Tbody>
          {expenses.map((expense, index) => {
            return (
              <ListItem expense={expense} key={expense.uid} index={index} />
            );
          })}
        </Tbody>
      </Table>
      <Container centerContent mt="4">
        <Button
          width="50%"
          _hover={{
            filter: "auto",
            brightness: "80%",
          }}
          onClick={onOpen}
        >
          Adicionar
        </Button>
      </Container>

      <AddExpense isOpen={isOpen} onClose={onClose} />
    </TableContainer>
  ) : (
    <Container centerContent maxW="md">
      <Text textAlign="center" fontSize="xl">
        Nenhum gasto adicionado até agora.
      </Text>

      <Button
        width="max-content"
        _hover={{
          filter: "auto",
          brightness: "80%",
        }}
        onClick={onOpen}
      >
        Adicionar
      </Button>

      <AddExpense isOpen={isOpen} onClose={onClose} />
    </Container>
  );
};

export default ExpenseList;
