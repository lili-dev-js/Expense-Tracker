import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpenseService } from './modules/expense/expense.service';
import { CategoryService } from './modules/category/category.service';
import { Category } from './schemas/category.schema'; // import typu Category

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const categoryService = app.get(CategoryService);
  const expenseService = app.get(ExpenseService);

  const createdCategories: Category[] = [];

  const categories = [
    { name: 'shoes' },
    { name: 'sdf' },
  ];

  for (const cat of categories) {
    const created = await categoryService.create(cat);
    createdCategories.push(created);
  }

  const expenses = [
    { name: 'nike', amount: 500, category: createdCategories[0]._id },
    { name: 'cable', amount: 12312, category: createdCategories[1]._id },
    { name: 'red lipstick', amount: 100, category: createdCategories[0]._id },
  ];

  for (const exp of expenses) {
    await expenseService.create(exp);
  }

  console.log('Seeding finished!');
  await app.close();
}

bootstrap();
