import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Expense } from '../../../schemas/expense.schema';

@ObjectType()
export class PaginationMeta {
  @Field(() => Int)
  totalRecords: number;

  @Field(() => Int)
  totalPages: number;

  @Field(() => Int)
  currentPage: number;

  @Field(() => Int)
  limit: number;
}

@ObjectType()
export class PaginatedExpensesOutput {
  @Field(() => [Expense])
  data: Expense[];

  @Field(() => PaginationMeta)
  pagination: PaginationMeta;
}
