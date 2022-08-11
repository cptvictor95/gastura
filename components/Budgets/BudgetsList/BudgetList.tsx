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
  useDisclosure,
  Button,
  Container,
} from "@chakra-ui/react";

const BudgetList: React.FC = () => {
  const { getUserBudgets } = useContext(BudgetCtx);
  const { user } = useLoggedInUser();
  const { budgets, setBudgets } = useBudgets();
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  if (isLoading)
    return (
      <Container centerContent maxW="md">
        <Loading />
      </Container>
    );

  return budgets && budgets.length !== 0 ? (
    <TableContainer
      //width="6xl"
      borderRadius="6px"
      pb="4"
      bgColor="rgba(0,0,0,0.5)"
    >
      <Table variant="striped" colorScheme="dgreen">
        <Thead bgColor="black">
          <Tr fontWeight="bold">
            <Th color="beige.100">#</Th>
            <Th color="beige.100">Nome</Th>
            <Th color="beige.100">Valor</Th>
            <Th color="beige.100">Opção</Th>
          </Tr>
        </Thead>

        <Tbody>
          {isLoading ? (
            <Loading />
          ) : (
            budgets &&
            budgets.map((budget, index) => {
              return (
                <ListItem budget={budget} key={budget.uid} index={index} />
              );
            })
          )}
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

      <AddBudget isOpen={isOpen} onClose={onClose} />
    </TableContainer>
  ) : (
    <Container centerContent maxW="md">
      <Text fontSize="xl">Nenhuma entrada adicionada até agora.</Text>

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
      <AddBudget isOpen={isOpen} onClose={onClose} />
    </Container>
  );
};

export default BudgetList;
