import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpenseInput } from './dto/create-expense.input';
import { UpdateExpenseInput } from './dto/update-expense.input';
import { Expense } from '../schemas/expense.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from '../schemas/category.schema';

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

  async findAll(): Promise<Expense[]> {
    return this.expenseModel.find().populate('category').exec();
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
    if (updateExpenseInput.category) {
      await this.ensureCategoryExists(updateExpenseInput.category);
    }

    const updatedExpense = await this.expenseModel
      .findByIdAndUpdate(id, updateExpenseInput, { new: true })
      .populate('category')
      .exec();

    return this.checkException(updatedExpense, id);
  }

  async remove(id: string): Promise<Expense> {
    const deletedExpense = await this.expenseModel.findByIdAndDelete(id).exec();

    return this.checkException(deletedExpense, id);
  }
}
