import {
  Button,
  Center,
  Flex,
  NativeSelect,
} from '@chakra-ui/react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import {
  SORT_BY,
  SORT_BY_ASC,
  SORT_BY_DESC,
  SORT_ORDER,
} from '../constants';
import { UseFormReturn } from 'react-hook-form';
import {TExpenseSortAndFilters} from "../types";

interface IProps {
  form: UseFormReturn<TExpenseSortAndFilters>;
  dataSortBy:IDataSortBy[]
}

interface IDataSortBy {
  value: string;
  name: string;
}

export const SortSelect = ({ form, dataSortBy }: IProps) => {
  const { register, watch, setValue } = form;
  const sortBy = watch(SORT_ORDER);

  const handleChangeSort = () => {
    if (sortBy === SORT_BY_ASC) {
      return setValue(SORT_ORDER, SORT_BY_DESC);
    }
    setValue(SORT_ORDER, SORT_BY_ASC);
  };

  return (
    <Flex
      border="1px solid"
      borderColor="gray.300"
      borderRadius="4px"
      justifyContent="flex-end"
    >
      <Center width="80px">Sort by:</Center>
      <NativeSelect.Root width="auto">
        <NativeSelect.Field
          width="150px"
          borderRadius="0px"
          borderTop="0px"
          borderBottom="0px"
          {...register(SORT_BY, { required: true })}
        >
          {dataSortBy?.map((data) => (
            <option key={data.value} value={data.value}>
              {data.name}
            </option>
          ))}
        </NativeSelect.Field>
      </NativeSelect.Root>
      <Button onClick={handleChangeSort} borderLeftRadius={0}>
        {sortBy === SORT_BY_ASC ? <BsChevronDown /> : <BsChevronUp />}
      </Button>
    </Flex>
  );
};
