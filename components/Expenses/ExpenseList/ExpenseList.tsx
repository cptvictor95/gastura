import Loading from "@/components/Loading/Loading";
import { ExpenseCtx } from "@/contexts/ExpenseContext";
import useLoggedInUser from "@/hooks/useLoggedInUser";
import {
  ButtonGroup,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
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

  const handleGetUserExpenses = async (userId: string) => {
    const expenses = await getUserExpenses(userId);

    setExpenses(expenses);
    setIsLoading(false);
  };

  useEffect(() => {
    if (user !== null && user !== false) handleGetUserExpenses(user.uid);
  }, [user]);

  return (
    <TableContainer borderRadius="6px">
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

        {isLoading ? (
          <Tbody>
            <Loading />
          </Tbody>
        ) : (
          <Tbody>
            {expenses.map((expense, index) => {
              return (
                <ListItem expense={expense} key={expense.uid} index={index} />
              );
            })}
          </Tbody>
        )}

        {!isLoading && expenses.length === 0 && (
          <Flex
            direction="column"
            gap="2"
            textAlign="center"
            width="240%"
            alignItems="center"
          >
            <Text fontSize="xl">Nenhum gasto adicionado até agora.</Text>
            <ButtonGroup width="25%">
              <AddExpense />
            </ButtonGroup>
          </Flex>
        )}
      </Table>
    </TableContainer>
  );
};

export default ExpenseList;
