import { ExpenseCtx } from "@/contexts/ExpenseContext";
import {
  Flex,
  Button,
  Input,
  Heading,
  FormControl,
  FormLabel,
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
      <Flex
        as="form"
        onSubmit={handleSubmit(submitUpdate)}
        direction="column"
        background="green.900"
        p={12}
        borderRadius="7px"
        fontSize="lg"
      >
        <Heading textAlign="center" mb={6} fontSize="3xl">
          Edite seu gasto
        </Heading>

        <FormControl>
          <FormLabel>Gasto</FormLabel>
          <Input {...register("description")} mb={6} />
        </FormControl>

        <FormControl>
          <FormLabel>Valor</FormLabel>
          <Input {...register("amount")} type="number" step="0.01" mb={10} />
        </FormControl>

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
      </Flex>
    </>
  );
};
export default EditExpenseForm;
