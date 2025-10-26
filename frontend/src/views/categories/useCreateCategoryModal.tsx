import {
  Button,
  useDisclosure,
  Text,
  Input,
  Field,
  Flex,
} from '@chakra-ui/react';
import { Modal } from '../../components';
import { useForm } from 'react-hook-form';
import { useCreateCategory, useUpdateCategory } from '../../query/category';
import { ICategory, ICategoryForm } from '../../types';

interface TProps {
  reload: () => void;
}
const hasId = (value: ICategoryForm): value is { _id: string; name: string } =>
    typeof value._id === 'string';

export const useCreateCategoryModal = ({ reload }: TProps) => {
  const { open, setOpen, onClose } = useDisclosure();
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<{ name: string; _id?: string }>({ defaultValues: { name: '' } });
  const id = watch('_id');

  const onSubmit = async (values: ICategoryForm) => {
    const response = await (hasId(values)
      ? updateCategory.mutateAsync(values)
      : createCategory.mutateAsync(values));
    if (response) {
      handleOnClose();
      reload();
    }
  };

  const handleEditCategory = (category: ICategory) => {
    setOpen(true);
    reset({
      _id: category._id,
      name: category.name,
    });
  };

  const handleCreateCategory = () => {
    setOpen(true);
  };

  const handleOnClose = () => {
    onClose();
    reset({ name: '' });
  };

  const CategoryFormModal = () => (
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

  return { CategoryFormModal, handleEditCategory, handleCreateCategory };
};
