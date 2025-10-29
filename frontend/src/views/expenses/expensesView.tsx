import { useFindAllExpenses, useRemoveExpense } from '../../query';
import { Button, Center, Flex } from '@chakra-ui/react';
import DefaultTable from '../../components/defaultTable';
import { showDate } from '../../helpers';
import { useAskRemoveModal } from '../../hooks/useAskRemoveModal';
import { useCreateExpenseModal } from './useCreateExpenseModal';
import { useFindAllCategories } from '../../query';
import { usePagination } from '../../hooks/usePagination';
import { useEffect } from 'react';
import { SortSelect } from '../../components';
import { useForm } from 'react-hook-form';
import { SORT_DEFAULT } from '../../constants';
import { ExpensesFilters } from './expensesFilters';

const DATA_SORT_BY = [
  { name: 'Created at', value: 'createdAt' },
  { name: 'Update at', value: 'updatedAt' },
];

const HEADERS = [
  { name: 'ID', key: '_id' },
  { name: 'Name', key: 'name' },
  { name: 'Amount', key: 'amount' },
  { name: 'Category', key: 'category' },
  { name: 'Payment date', key: 'paymentDate' },
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
  const filtersAndSortForm = useForm({
    mode: 'onChange',
    defaultValues: { categoryId: '', ...SORT_DEFAULT },
  });
  const { data: categories } = useFindAllCategories();
  const filters = filtersAndSortForm.watch();
  const { pagination } = usePagination();
  const {
    data,
    refetch: reload,
    isFetching,
  } = useFindAllExpenses({
    ...filters,
    page: pagination.currentPage,
    limit: pagination.limit,
  });

  useEffect(() => {
    reload();
  }, [filters.categoryId, filters.sortBy, filters.sortOrder]);

  useEffect(() => {
    if (data?.pagination) {
      pagination.setPagination(data.pagination);
    }
  }, [data]);

  useEffect(() => {
    if (
      data?.pagination &&
      data.pagination.currentPage !== pagination.currentPage
    ) {
      pagination.setPagination(data.pagination);
    }
  }, [data?.pagination]);

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
          Add new +
        </Button>
      </Flex>
      <Flex justifyContent="space-between" w="100%" mb={4}>
        <ExpensesFilters form={filtersAndSortForm} categories={categories} />
        <SortSelect form={filtersAndSortForm} dataSortBy={DATA_SORT_BY} />
      </Flex>
      <AskRemoveModal />
      <ExpenseFormModal />
      <DefaultTable
        pagination={pagination}
        isFetching={isFetching}
        headers={HEADERS}
        data={data?.expenses?.map((record) => ({
          ...record,
          updatedAt: showDate(record.updatedAt),
          createdAt: showDate(record.createdAt),
          paymentDate: showDate(record.paymentDate),
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
