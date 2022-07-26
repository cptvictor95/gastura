import { ExpenseCtx } from "@/contexts/ExpenseContext";
import {
  Flex,
  Button,
  Input,
  Heading,
  FormControl,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";

import { Expense } from "types/Expense";

interface EditExpenseType {
  description: string;
  amount: number;
}
const EditExpenseForm: React.FC<{ expense: Expense }> = ({ expense }) => {
  const router = useRouter();
  const { updateExpense } = useContext(ExpenseCtx);
  const { register, handleSubmit } = useForm<EditExpenseType>({
    defaultValues: {
      description: expense.description,
      amount: expense.amount,
    },
  });

  const submitUpdate = async (data: EditExpenseType) => {
    try {
      console.log(data);
      await updateExpense(expense.uid, {
        ...expense,
        description: data.description,
        amount: Number(data.amount),
      });
    } catch (error) {
      console.log(error);
    }
    await router.push("/expenses");
  };

  return (
    <>
      <Flex height="100vh" alignItems="center" justifyContent="center" mt="-28">
        <Flex
          direction="column"
          background="green.900"
          p={12}
          borderRadius="7px"
          fontSize="lg"
        >
          <Heading mb={6} fontSize="32">
            Edite seu gasto
          </Heading>
          <FormControl as="div" onSubmit={handleSubmit(submitUpdate)}>
            <Text>Gasto</Text>
            <Input {...register("description")} mb={6} />

            <Text>Valor</Text>
            <Input {...register("amount")} type="number" step="0.01" mb={10} />

            <Button
              type="submit"
              _hover={{
                filter: "auto",
                brightness: "90%",
              }}
              color="black"
              background="white"
              width="100%"
              fontSize="lg"
            >
              Atualizar
            </Button>
          </FormControl>
        </Flex>
      </Flex>
    </>
  );
};
export default EditExpenseForm;
