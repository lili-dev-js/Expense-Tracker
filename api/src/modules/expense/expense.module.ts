import { forwardRef, Module } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseResolver } from './expense.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Expense, ExpenseSchema } from '../../schemas/expense.schema';
import { CategoryModule } from '../category/category.module';
import { Category, CategorySchema } from '../../schemas/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Expense.name, schema: ExpenseSchema }]),
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
    forwardRef(() => CategoryModule),
  ],
  providers: [ExpenseResolver, ExpenseService],
})
export class ExpenseModule {}
