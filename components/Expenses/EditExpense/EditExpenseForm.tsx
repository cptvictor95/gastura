import { ExpenseCtx } from "@/contexts/ExpenseContext";
import { Flex, Button, Input, Heading } from "@chakra-ui/react";
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
          background="gray.700"
          p={12}
          rounded={6}
          fontSize="lg"
        >
          <Heading mb={6} fontSize="32">
            Edite seu gasto
          </Heading>
          <form onSubmit={handleSubmit(submitUpdate)}>
            <div>
              <label>Gasto</label>
              <Input {...register("description")} mb={6} />
            </div>
            <div>
              <label>Valor</label>
              <Input
                {...register("amount")}
                type="number"
                step="0.01"
                mb={10}
              />
            </div>
            <Button
              type="submit"
              _hover={{
                background: "gray.400",
                color: "black",
              }}
              color="black"
              background="gray.100"
              width="100%"
              fontSize="lg"
            >
              Atualizar
            </Button>
          </form>
        </Flex>
      </Flex>
    </>
  );
};
export default EditExpenseForm;
