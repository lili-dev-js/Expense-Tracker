import { useFindAllExpenses, useRemoveExpense } from '../../query';
import { Button, Center, Flex } from '@chakra-ui/react';
import DefaultTable from '../../components/defaultTable';
import { showDate } from '../../helpers';
import { useAskRemoveModal } from '../../hooks/useAskRemoveModal';
import { useCreateExpenseModal } from './useCreateExpenseModal';
import { useFindAllCategories } from '../../query';

const HEADERS = [
  { name: 'ID', key: '_id' },
  { name: 'Name', key: 'name' },
  { name: 'Amount', key: 'amount' },
  { name: 'Category', key: 'category' },
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

export const ExpensesView = () => {
  const { data: categories } = useFindAllCategories();
  const { data, refetch: reload, isFetching } = useFindAllExpenses();

  const removeExpense = useRemoveExpense();
  const { ExpenseFormModal, handleEditExpense, handleCreateExpense } =
    useCreateExpenseModal({ reload, categories });

  const { handleDeleteItem, AskRemoveModal } = useAskRemoveModal({
    nameItem: 'expense',
    reload,
    remove: (item) => removeExpense.mutateAsync(item._id),
  });

  return (
    <Center maxWidth="1000px" flexDirection="column" w="100%" py={4}>
      <Flex justifyContent="flex-end" w="100%" mb={4}>
        <Button onClick={handleCreateExpense} colorPalette="green">
          {' '}
          Add new +
        </Button>
      </Flex>
      <AskRemoveModal />
      <ExpenseFormModal />
      <DefaultTable
        isFetching={isFetching}
        headers={HEADERS}
        data={data?.map((record) => ({
          ...record,
          updatedAt: showDate(record.updatedAt),
          createdAt: showDate(record.createdAt),
          category: record.category?.name || '-',
          actions: (
            <Flex>
              <Button
                size="xs"
                py="auto"
                colorPalette="green"
                mr={2}
                onClick={() => handleEditExpense(record)}
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
