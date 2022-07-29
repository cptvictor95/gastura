import React, { useContext, useState } from "react";

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
  FormHelperText,
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
  useDisclosure,
} from "@chakra-ui/react";

type ExpenseForm = {
  uid?: string;
  description: string;
  amount: number;
  budgetId: string;
};

const AddExpense: React.FC = () => {
  const { register, handleSubmit } = useForm<ExpenseForm>({
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
  const { isOpen, onOpen, onClose } = useDisclosure();

  const submitBudgetForm = (data: ExpenseForm) => {
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

  const [input, setInput] = useState("");

  const handleInputChange = (e) => setInput(e.target.value);

  const isError = input === "";

  return (
    <>
      <Button
        onClick={onOpen}
        _hover={{
          filter: "auto",
          brightness: "80%",
        }}
        bgColor="beige.100"
      >
        Adicionar
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bgColor="green.900" borderRadius="6">
          <Flex
            color="beige.100"
            as="form"
            direction="column"
            onSubmit={handleSubmit(submitBudgetForm)}
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

            <ModalBody onSubmit={handleSubmit(submitBudgetForm)}>
              <FormControl isInvalid={isError}>
                <FormLabel>Descrição</FormLabel>
                <Input
                  type="descrição"
                  onChange={handleInputChange}
                  placeholder="Ex.: Belle Lanches"
                  {...register("description", {
                    required: { value: true, message: "Digite uma descrição" },
                  })}
                />

                {!isError ? (
                  <FormHelperText></FormHelperText>
                ) : (
                  <FormErrorMessage>
                    Digite o nome de seu gasto!
                  </FormErrorMessage>
                )}
              </FormControl>

              <FormControl isInvalid={isError}>
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

                {!isError ? (
                  <FormHelperText></FormHelperText>
                ) : (
                  <FormErrorMessage>Digite um valor!</FormErrorMessage>
                )}
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="budgetId">Categoria</FormLabel>
                <Select
                  id="budgetId"
                  {...register("budgetId", {
                    required: { value: true, message: "Escolha uma categoria" },
                  })}
                  colorScheme="blue"
                >
                  <option value="" disabled>
                    Categoria do Gasto
                  </option>
                  {typeof budgets !== "boolean" &&
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
