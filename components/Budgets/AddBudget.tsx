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
  Button,
  Input,
  FormLabel,
  Flex,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import useBudgets from "stores/useBudgets";
import { Budget } from "types/Budget";

type BudgetForm = {
  name: string;
  amount: number;
};

const AddBudget: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<BudgetForm>({
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

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
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
              Novo Orçamento
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isInvalid={Boolean(errors.name)}>
                <FormLabel>Categoria</FormLabel>
                <Input
                  type="categoria"
                  {...register("name", {
                    required: { value: true, message: "Digite uma descrição" },
                  })}
                  placeholder="Ex.: Alimentação"
                />
                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={Boolean(errors.amount)}>
                <FormLabel>Valor</FormLabel>
                <Input
                  type="number"
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
                <FormErrorMessage>
                  {errors.amount && errors.amount.message}
                </FormErrorMessage>
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

export default AddBudget;
