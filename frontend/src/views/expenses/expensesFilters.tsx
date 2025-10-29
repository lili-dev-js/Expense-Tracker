import { Flex, NativeSelect } from '@chakra-ui/react';
import { UseFormReturn } from 'react-hook-form';
import {ICategory, TExpenseSortAndFilters} from '../../types';

interface IProps {
  form: UseFormReturn<TExpenseSortAndFilters>;
  categories?: ICategory[];
}

export const ExpensesFilters = ({ form, categories }: IProps) => {
  const { register } = form;

  return (
    <Flex>
      <NativeSelect.Root width="auto">
        <NativeSelect.Field
          width="200px"
          placeholder={`Filter by categories`}
          {...register('categoryId', { required: true })}
        >
          {categories?.map((data) => (
            <option key={data.name} value={data._id}>
              {data.name}
            </option>
          ))}
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
    </Flex>
  );
};
