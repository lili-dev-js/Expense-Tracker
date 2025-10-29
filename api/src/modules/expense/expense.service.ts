import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpenseInput } from './dto/create-expense.input';
import { UpdateExpenseInput } from './dto/update-expense.input';
import { Expense } from '../../schemas/expense.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from '../../schemas/category.schema';
import { PaginatedExpensesOutput } from './dto/paginated-expenses.output';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectModel(Expense.name) private readonly expenseModel: Model<Expense>,
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}

  private async ensureCategoryExists(categoryId: string) {
    const category = await this.categoryModel.findById(categoryId).exec();
    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }
    return category;
  }

  private checkException(expense: Expense | null, id: string) {
    if (!expense)
      throw new NotFoundException(`Expense with ID ${id} not found`);

    return expense;
  }

  async create(createExpenseInput: CreateExpenseInput): Promise<Expense> {
    await this.ensureCategoryExists(createExpenseInput.category);
    const createdExpense = new this.expenseModel({
      ...createExpenseInput,
      category: new Types.ObjectId(createExpenseInput.category),
    });
    await createdExpense.save();
    return createdExpense.populate('category');
  }

  async findAll(
    categoryId?: string,
    sortBy: 'createdAt' | 'updatedAt' = 'createdAt',
    sortOrder: 'asc' | 'desc' = 'desc',
    page = 1,
    limit = 10,
  ): Promise<PaginatedExpensesOutput> {
    const filter: Record<string, any> = {};

    if (categoryId) {
      await this.ensureCategoryExists(categoryId);
      filter.category = new Types.ObjectId(categoryId);
    }

    const skip = (page - 1) * limit;

    const [data, totalRecords] = await Promise.all([
      this.expenseModel
        .find(filter)
        .populate('category')
        .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.expenseModel.countDocuments(filter).exec(),
    ]);

    const totalPages = Math.ceil(totalRecords / limit);

    return {
      data,
      pagination: {
        totalRecords,
        totalPages,
        currentPage: page,
        limit,
      },
    };
  }

  async findOne(id: string): Promise<Expense> {
    const expense = await this.expenseModel
      .findById(id)
      .populate('category')
      .exec();

    return this.checkException(expense, id);
  }

  async update(
    id: string,
    updateExpenseInput: UpdateExpenseInput,
  ): Promise<Expense> {
    const updateData: any = { ...updateExpenseInput };

    if (updateExpenseInput.category) {
      await this.ensureCategoryExists(updateExpenseInput.category);
    }

    const updatedExpense = await this.expenseModel
      .findByIdAndUpdate(
        id,
        {
          ...updateData,
          category: new Types.ObjectId(updateExpenseInput.category),
        },
        { new: true },
      )
      .populate('category')
      .exec();

    return this.checkException(updatedExpense, id);
  }

  async remove(id: string): Promise<Expense> {
    const deletedExpense = await this.expenseModel.findByIdAndDelete(id).exec();

    return this.checkException(deletedExpense, id);
  }
}
