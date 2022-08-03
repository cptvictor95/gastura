import { BudgetCtx } from "@/contexts/BudgetContext";
import { ExpenseCtx } from "@/contexts/ExpenseContext";
import useLoggedInUser from "@/hooks/useLoggedInUser";
import React, { useContext, useEffect, useState } from "react";
import useBudgets from "stores/useBudgets";
import useExpenses from "stores/useExpenses";
import { Budget } from "types/Budget";
import { Expense } from "types/Expense";
import AddBudget from "../Budgets/AddBudget";
import AddExpense from "../Expenses/AddExpenses/AddExpense";

import { motion } from "framer-motion";
import {
  Box,
  Button,
  Container,
  Flex,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const LoadedText = ({ children }) => (
  <motion.p
    initial="hidden"
    animate="visible"
    transition={{ duration: 0.6 }}
    variants={variants}
  >
    {children}
  </motion.p>
);

const SkeletonText = ({ children }) => (
  <motion.div
    initial="hidden"
    animate="visible"
    transition={{ duration: 0.6 }}
    variants={variants}
  >
    {children}
  </motion.div>
);

const Dashboard: React.FC = () => {
  const { authState, user } = useLoggedInUser();
  const { getUserBudgets } = useContext(BudgetCtx);
  const { getUserExpenses } = useContext(ExpenseCtx);
  const [totalBudget, setTotalBudget] = useState<number | false>(false);
  const [totalExpenses, setTotalExpenses] = useState<number | false>(false);
  const [userWallet, setUserWallet] = useState<number | false>(false);
  const [isLoading, setIsLoading] = useState(true);
  const { budgets, setBudgets } = useBudgets();
  const { expenses, setExpenses } = useExpenses();
  const {
    isOpen: isAddBudgetOpen,
    onOpen: onAddBudgetOpen,
    onClose: onAddBudgetClose,
  } = useDisclosure();
  const {
    isOpen: isAddExpenseOpen,
    onOpen: onAddExpenseOpen,
    onClose: onAddExpenseClose,
  } = useDisclosure();
  const handleUserTotals = async (budgets: Budget[], expenses: Expense[]) => {
    try {
      let totalBudget = 0;
      let totalExpenses = 0;

      budgets.map((budget) => (totalBudget += budget.amount));

      expenses.map((expense) => (totalExpenses += expense.amount));

      setTotalBudget(totalBudget);
      setTotalExpenses(totalExpenses);
      if (expenses) {
        setUserWallet(totalBudget - totalExpenses);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (budgets && expenses) {
      handleUserTotals(budgets, expenses);
      setIsLoading(false);
    }
  }, [budgets, expenses]);

  useEffect(() => {
    if (user) {
      const handleGetBudgets = async () => {
        const budgets = await getUserBudgets(user.uid);

        setBudgets(budgets);
      };
      const handleGetExpenses = async () => {
        const expenses = await getUserExpenses(user.uid);

        setExpenses(expenses);
      };

      handleGetBudgets();
      handleGetExpenses();
    }
  }, [user]);

  useEffect(() => {
    if (authState === "LOADING") {
      setIsLoading(true);
    }
  }, [authState]);

  const fixNumber = (hugeNumber: number) => {
    return Number(hugeNumber).toFixed(2);
  };

  return (
    <Container as="section" maxWidth="4xl" height="100%" py="20">
      <Flex
        width="100%"
        height="100%"
        justify="space-between"
        align="flex-start"
      >
        <Box bgColor="green.900" p="3" borderRadius="6">
          <Text textAlign="center" fontSize="xl">
            Total de Gastos
          </Text>
          {isLoading ? (
            <SkeletonText>
              <Text fontSize="xl" textAlign="center">
                R$00,00
              </Text>
            </SkeletonText>
          ) : (
            <LoadedText>
              <Text fontSize="xl" textAlign="center">
                R${totalExpenses && fixNumber(totalExpenses)}
              </Text>
            </LoadedText>
          )}
          <Button
            mb="2"
            onClick={onAddExpenseOpen}
            _hover={{
              filter: "auto",
              brightness: "80%",
            }}
            bgColor="beige.100"
            width="100%"
          >
            Adicionar
          </Button>
        </Box>

        <AddExpense onClose={onAddExpenseClose} isOpen={isAddExpenseOpen} />
        <Box height="5rem" bgColor="green.900" p="2" borderRadius="6">
          <Text textAlign="center" fontSize="xl">
            Carteira
          </Text>

          {isLoading ? (
            <SkeletonText>
              <Text textAlign="center" fontSize="xl">
                R$00,00
              </Text>
            </SkeletonText>
          ) : (
            <LoadedText>
              <Text fontSize="xl">R${userWallet && fixNumber(userWallet)}</Text>
            </LoadedText>
          )}
        </Box>

        <Box bgColor="green.900" p="4" borderRadius="6">
          <Text textAlign="center" fontSize="xl" width="100%">
            Orçamento total
          </Text>
          {isLoading ? (
            <SkeletonText>
              <Text textAlign="center" fontSize="xl">
                R$00,00
              </Text>
            </SkeletonText>
          ) : (
            <LoadedText>
              <Text textAlign="center" fontSize="xl">
                R${totalBudget && fixNumber(totalBudget)}
              </Text>
            </LoadedText>
          )}
          <Button
            _hover={{
              filter: "auto",
              brightness: "80%",
            }}
            bgColor="beige.100"
            onClick={onAddBudgetOpen}
          >
            Adicionar
          </Button>
        </Box>

        <AddBudget isOpen={isAddBudgetOpen} onClose={onAddBudgetClose} />
      </Flex>
    </Container>
  );
};

export default Dashboard;
