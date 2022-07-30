import React, { useContext } from "react";

import { useForm } from "react-hook-form";
import { BudgetCtx } from "@/contexts/BudgetContext";
import useLoggedInUser from "@/hooks/useLoggedInUser";
import { Expense } from "types/Expense";
import { ExpenseCtx } from "@/contexts/ExpenseContext";
import useBudgets from "stores/useBudgets";
import useExpenses from "stores/useExpenses";

import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
} from "@chakra-ui/react";

type ExpenseForm = {
  uid?: string;
  description: string;
  amount: number;
  budgetId: string;
};

const AddExpense: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExpenseForm>({
    mode: "onChange",
    defaultValues: {
      description: "",
      amount: null,
      budgetId: "",
    },
  });
  const { user } = useLoggedInUser();
  const { updateBudget, getBudgetById } = useContext(BudgetCtx);
  const { createExpense } = useContext(ExpenseCtx);
  const { budgets } = useBudgets();
  const { expenses, setExpenses } = useExpenses();

  const submitExpenseForm = (data: ExpenseForm) => {
    handleCreateExpense({
      description: data.description,
      amount: Number(data.amount),
      budgetId: data.budgetId,
      createdAt: Date.now(),
    });
  };

  const handleCreateExpense = async (newExpense: Expense) => {
    try {
      if (user && typeof expenses !== "boolean") {
        const newExpenseId = await createExpense(newExpense);
        const budget = await getBudgetById(newExpense.budgetId);

        if (newExpenseId && budget) {
          await updateBudget(newExpense.budgetId, {
            expenses: [...budget.expenses, newExpenseId],
          });

          setExpenses([...expenses, { uid: newExpenseId, ...newExpense }]);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bgColor="green.900" borderRadius="6">
          <Flex
            color="beige.100"
            as="form"
            direction="column"
            onSubmit={handleSubmit(submitExpenseForm)}
          >
            <ModalHeader
              color="beige.100"
              textAlign="center"
              bgColor="darkgreen.800"
              borderTopRadius="6"
            >
              Novo Gasto
            </ModalHeader>
            <ModalCloseButton />

            <ModalBody>
              <FormControl isInvalid={Boolean(errors.description)}>
                <FormLabel>Descrição</FormLabel>
                <Input
                  type="descrição"
                  placeholder="Ex.: Belle Lanches"
                  {...register("description", {
                    required: { value: true, message: "Digite uma descrição" },
                  })}
                />
                <FormErrorMessage>
                  {errors.description && errors.description.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={Boolean(errors.amount)}>
                <FormLabel htmlFor="amount">Valor do gasto</FormLabel>
                <Input
                  placeholder="R$00,00"
                  type="number"
                  step={0.01}
                  min={0}
                  {...register("amount", {
                    required: { value: true, message: "Digite um valor" },
                  })}
                />
                <FormErrorMessage>
                  {errors.amount && errors.amount.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="budgetId">Categoria</FormLabel>
                <Select
                  colorScheme="blue"
                  id="budgetId"
                  {...register("budgetId", {
                    required: { value: true, message: "Escolha uma categoria" },
                  })}
                >
                  <option value="" disabled>
                    Categoria do Gasto
                  </option>
                  {budgets &&
                    budgets.map((budget) => (
                      <option value={budget.uid} key={budget.uid}>
                        {budget.name[0].toUpperCase() + budget.name.slice(1)}
                      </option>
                    ))}
                </Select>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button
                type="submit"
                _hover={{
                  filter: "auto",
                  brightness: "80%",
                }}
                onClick={onClose}
              >
                Adicionar
              </Button>
            </ModalFooter>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddExpense;

/**
 * @todo Fix ColorScheme in the budget List page

 * @todo add errors to edit budgets and expenses

 * @todo fix many items list problem in budget/expense
 */
