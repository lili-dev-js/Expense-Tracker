import { forwardRef, Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryResolver } from './category.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from '../../schemas/category.schema';
import { ExpenseModule } from '../../expense/expense.module';
import { AnalyticsService } from './analitic.service';
import { Expense, ExpenseSchema } from '../../schemas/expense.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
    MongooseModule.forFeature([{ name: Expense.name, schema: ExpenseSchema }]),
    forwardRef(() => ExpenseModule),
  ],
  providers: [CategoryResolver, CategoryService, AnalyticsService],
})
export class CategoryModule {}
