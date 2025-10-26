import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';
import { CategoryModule } from './modules/category/category.module';
import { ExpenseModule } from './modules/expense/expense.module';
import { Category } from './schemas/category.schema';
import { Expense } from './schemas/expense.schema';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI as string),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      playground: true,
      sortSchema: true,
      debug: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      orphanedTypes: [Expense, Category],
    }),
    ExpenseModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
