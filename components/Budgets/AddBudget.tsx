import { BudgetCtx } from "@/contexts/BudgetContext";
import { UserCtx } from "@/contexts/UserContext";
import useLoggedInUser from "@/hooks/useLoggedInUser";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Input,
  FormLabel,
  Flex,
  FormControl,
  FormHelperText,
  FormErrorMessage,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import useBudgets from "stores/useBudgets";
import { Budget } from "types/Budget";

type BudgetForm = {
  name: string;
  amount: number;
};

const AddBudget: React.FC = () => {
  const { register, handleSubmit, setError } = useForm<BudgetForm>({
    mode: "onChange",
    defaultValues: {
      name: "",
      amount: null,
    },
  });
  const { user } = useLoggedInUser();
  const { budgets, setBudgets } = useBudgets();
  const { createBudget } = useContext(BudgetCtx);
  const { updateUser } = useContext(UserCtx);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const submitBudgetForm = (data: BudgetForm) => {
    handleCreateBudget({
      name: data.name,
      amount: Number(data.amount),
    });
  };

  const handleCreateBudget = async (newBudget: Partial<Budget>) => {
    try {
      if (user && typeof budgets !== "boolean") {
        if (budgets.some((budget) => budget.name === newBudget.name)) {
          setError(
            "name",
            {
              message: "Você já tem um orçamento com este nome",
            },
            { shouldFocus: true }
          );
        } else {
          const newBudgetId = await createBudget({
            name: newBudget.name,
            amount: newBudget.amount,
            userId: user.uid,
            expenses: [],
          });

          await updateUser(user.uid, {
            budgets: [...user.budgets, newBudgetId],
          });

          setBudgets([
            ...budgets,
            { uid: newBudgetId, ...newBudget } as Budget,
          ]);
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
        _hover={{
          filter: "auto",
          brightness: "80%",
        }}
        bgColor="beige.100"
        onClick={onOpen}
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
              borderRadius="6"
            >
              Novo Orçamento
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isInvalid={isError}>
                <FormLabel>Categoria</FormLabel>
                <Input
                  type="categoria"
                  onChange={handleInputChange}
                  {...register("name", {
                    required: { value: true, message: "Digite uma descrição" },
                  })}
                  placeholder="Ex.: Alimentação"
                />

                {!isError ? (
                  <FormHelperText></FormHelperText>
                ) : (
                  <FormErrorMessage>Categoria requerida</FormErrorMessage>
                )}
              </FormControl>

              <FormControl isInvalid={isError}>
                <FormLabel>Valor</FormLabel>
                <Input
                  type="number"
                  onChange={handleInputChange}
                  step={0.01}
                  min={0}
                  placeholder="R$00,00"
                  {...register("amount", {
                    required: {
                      value: true,
                      message: "Digite um valor máximo",
                    },
                  })}
                />
                {!isError ? (
                  <FormHelperText></FormHelperText>
                ) : (
                  <FormErrorMessage>
                    Digite o valor de sua entrada!
                  </FormErrorMessage>
                )}
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button type="submit">Adicionar</Button>
            </ModalFooter>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddBudget;

/**
 * @todo Fix ColorScheme in the budget List page
 * @todo centralize Loading for lists
 * @todo fix error problem in addbudget and add errors to edit budgets and expenses
 * @todo centralize Modal in all pages who have it
 * @todo fix many items list problem in budget/expense
 */
