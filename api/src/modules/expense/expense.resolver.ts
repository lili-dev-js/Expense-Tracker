import { Resolver, Mutation, Query, Args, ID } from '@nestjs/graphql';
import { ExpenseService } from './expense.service';
import { Expense } from '../../schemas/expense.schema';
import { CreateExpenseInput } from './dto/create-expense.input';
import { UpdateExpenseInput } from './dto/update-expense.input';

@Resolver(() => Expense)
export class ExpenseResolver {
  constructor(private readonly expenseService: ExpenseService) {}

  @Mutation(() => Expense)
  createExpense(
    @Args('createExpenseInput') createExpenseInput: CreateExpenseInput,
  ): Promise<Expense> {
    return this.expenseService.create(createExpenseInput);
  }

  @Query(() => [Expense])
  findAllExpenses(): Promise<Expense[]> {
    return this.expenseService.findAll();
  }

  @Query(() => Expense)
  findExpense(@Args('id', { type: () => ID }) id: string): Promise<Expense> {
    return this.expenseService.findOne(id);
  }

  @Mutation(() => Expense)
  updateExpense(
    @Args('updateExpenseInput') updateExpenseInput: UpdateExpenseInput,
  ): Promise<Expense> {
    return this.expenseService.update(
      updateExpenseInput._id,
      updateExpenseInput,
    );
  }

  @Mutation(() => Expense)
  removeExpense(@Args('id', { type: () => ID }) id: string): Promise<Expense> {
    return this.expenseService.remove(id);
  }
}
