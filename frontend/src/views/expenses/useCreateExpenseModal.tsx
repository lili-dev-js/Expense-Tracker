import {
  Button,
  useDisclosure,
  Text,
  Input,
  Field,
  Flex,
  NativeSelect,
} from '@chakra-ui/react';
import { Modal } from '../../components';
import { useForm } from 'react-hook-form';
import { useCreateExpense, useUpdateExpense } from '../../query';
import { ICategory, IExpense, IExpenseForm } from '../../types';

interface TProps {
  reload: () => void;
  categories?: ICategory[];
}

const hasId = (value: IExpenseForm | IExpense): value is IExpense =>
  typeof value._id === 'string';

export const useCreateExpenseModal = ({ reload, categories }: TProps) => {
  const { open, setOpen, onClose } = useDisclosure();
  const createExpense = useCreateExpense();
  const updateExpense = useUpdateExpense();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<IExpenseForm>();
  const onSubmit = async (values: IExpenseForm) => {
    const response = await (hasId(values)
      ? updateExpense.mutateAsync(values)
      : createExpense.mutateAsync(values));
    if (response) {
      handleOnClose();
      reload();
    }
  };

  const handleEditExpense = (expense: IExpense) => {
    setOpen(true);
    reset({
      _id: expense._id,
      name: expense.name,
      amount: expense.amount,
      category: expense.category?._id,
    });
  };

  const handleCreateExpense = () => {
    setOpen(true);
  };

  const handleOnClose = () => {
    onClose();
    reset({ name: '' });
  };

  const ExpenseFormModal = () => (
    <Modal tittle="Create skill" open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field.Root color="gray.600">
          <Field.Label>
            Name <Field.RequiredIndicator />
          </Field.Label>
          <Input
            {...register('name', { required: true })}
            placeholder="Enter name"
          />
          {errors.name && <Text color="red.500">This field is required</Text>}
        </Field.Root>

        <Field.Root color="gray.600">
          <Field.Label>
            Amount <Field.RequiredIndicator />
          </Field.Label>
          <Input
            {...register('amount', { required: true })}
            placeholder="Enter amount"
          />
          {errors.name && <Text color="red.500">This field is required</Text>}
        </Field.Root>

        <Field.Root color="gray.600">
          <Field.Label>
            Category <Field.RequiredIndicator />
          </Field.Label>
          <NativeSelect.Root>
            <NativeSelect.Field
              placeholder="Select category"
              {...register('category', { required: true })}
            >
              {categories?.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
          {errors.category && <Text color="red.500">This field is required</Text>}
        </Field.Root>

        <Flex justifyContent="flex-end" mt={4}>
          <Button
            variant="outline"
            colorPalette="red"
            mr={4}
            onClick={handleOnClose}
          >
            Cancel
          </Button>
          <Button type="submit" colorPalette="green" color="gray.50">
            Save
          </Button>
        </Flex>
      </form>
    </Modal>
  );

  return { ExpenseFormModal, handleEditExpense, handleCreateExpense };
};
