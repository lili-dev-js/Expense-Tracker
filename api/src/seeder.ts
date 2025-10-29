import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpenseService } from './modules/expense/expense.service';
import { CategoryService } from './modules/category/category.service';
import { Category } from './schemas/category.schema';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const categoryService = app.get(CategoryService);
  const expenseService = app.get(ExpenseService);

  const createdCategories: Category[] = [];

  console.log('Creating categories...');
  for (let i = 1; i <= 5; i++) {
    const created = await categoryService.create({ name: `Category ${i}` });
    console.log(`Created category: ${created.name} (${created._id})`);
    createdCategories.push(created);
  }

  const now = new Date();
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(now.getMonth() - 1);

  console.log('Creating expenses...');
  for (const category of createdCategories) {
    for (let j = 1; j <= 20; j++) {
      const randomTime =
        oneMonthAgo.getTime() +
        Math.random() * (now.getTime() - oneMonthAgo.getTime());

      const expense = await expenseService.create({
        name: `Expense ${j} of ${category.name}`,
        amount: Math.floor(Math.random() * 1000) + 1,
        category: category._id,
        paymentDate: new Date(randomTime),
      });

      console.log(
        `Created expense: ${expense.name}, amount: ${expense.amount}`,
      );
    }
  }

  console.log('Seeder finished: 5 categories, 100 expenses created.');
  await app.close();
}

bootstrap();
