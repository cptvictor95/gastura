import React, { useEffect, useState, useContext } from "react";
import useLoggedInUser from "@/hooks/useLoggedInUser";
import { BudgetCtx } from "@/contexts/BudgetContext";
import ListItem from "./ListItem/ListItem";

import Loading from "@/components/Loading/Loading";
import AddBudget from "../AddBudget";
import useBudgets from "stores/useBudgets";
import {
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  Text,
} from "@chakra-ui/react";

const BudgetList: React.FC = () => {
  const { getUserBudgets } = useContext(BudgetCtx);
  const { user } = useLoggedInUser();
  const { budgets, setBudgets } = useBudgets();
  const [isLoading, setIsLoading] = useState(true);

  const handleGetUserBudget = async (userId: string) => {
    const budgets = await getUserBudgets(userId);

    setBudgets(budgets);
    setIsLoading(false);
  };

  useEffect(() => {
    let mounted = true;

    if (user !== null && user !== false && mounted)
      handleGetUserBudget(user.uid);
    return () => {
      mounted = false;
    };
  }, [user]);

  return (
    <TableContainer borderRadius="6px">
      <Table variant="striped" colorScheme="dgreen">
        <Thead bgColor="black">
          <Tr fontWeight="bold">
            <Th color="beige.100">#</Th>
            <Th color="beige.100">Nome</Th>
            <Th color="beige.100">Valor</Th>
            <Th color="beige.100">Opção</Th>
          </Tr>
        </Thead>

        {isLoading ? (
          <Tbody>
            <Loading />
          </Tbody>
        ) : (
          budgets &&
          budgets.map((budget, index) => {
            return <ListItem budget={budget} key={budget.uid} index={index} />;
          })
        )}

        {!isLoading && budgets && budgets.length === 0 && (
          <Tbody>
            <Text fontSize="xl">Nenhuma entrada adicionada até agora.</Text>
            <AddBudget />
          </Tbody>
        )}
      </Table>
    </TableContainer>
  );
};

export default BudgetList;
