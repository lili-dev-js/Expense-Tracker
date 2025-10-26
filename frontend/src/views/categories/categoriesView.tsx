import { useFindAllCategories, useRemoveCategory } from '../../query/category';
import { Button, Center, Flex } from '@chakra-ui/react';
import DefaultTable from '../../components/defaultTable';
import { showDate } from '../../helpers';
import { useAskRemoveModal } from '../../hooks/useAskRemoveModal';
import { useCreateCategoryModal } from './useCreateCategoryModal';

const HEADERS = [
  { name: 'ID', key: '_id' },
  { name: 'Name', key: 'name' },
  {
    name: 'Created at',
    key: 'createdAt',
  },
  {
    name: 'Updated at',
    key: 'updatedAt',
  },
  {
    name: 'Actions',
    key: 'actions',
  },
];

export const CategoriesView = () => {
  const { data, refetch: reload, isFetching } = useFindAllCategories();
  const removeCategory = useRemoveCategory();
  const { CategoryFormModal, handleEditCategory, handleCreateCategory } =
    useCreateCategoryModal({ reload });

  const { handleDeleteItem, AskRemoveModal } = useAskRemoveModal({
    nameItem: 'category',
    reload,
    remove: (item) => removeCategory.mutateAsync(item._id),
  });

  return (
    <Center maxWidth="1000px" flexDirection="column" w="100%" py={4}>
        <Flex justifyContent="flex-end" w="100%" mb={4}>
            <Button onClick={handleCreateCategory} colorPalette="green"> Add new +</Button>
        </Flex>
      <AskRemoveModal />
      <CategoryFormModal />
      <DefaultTable
          isFetching={isFetching}
        headers={HEADERS}
        data={data?.map((record) => ({
          ...record,
          updatedAt: showDate(record.updatedAt),
          createdAt: showDate(record.createdAt),
          actions: (
            <Flex>
              <Button
                size="xs"
                py="auto"
                colorPalette="green"
                mr={2}
                onClick={() => handleEditCategory(record)}
              >
                edit
              </Button>
              <Button
                size="xs"
                py="auto"
                colorPalette="red"
                onClick={() => handleDeleteItem(record)}
              >
                delete
              </Button>
            </Flex>
          ),
        }))}
      />
    </Center>
  );
};
