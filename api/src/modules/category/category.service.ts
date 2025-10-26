import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from '../../schemas/category.schema';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  private checkCategory(category: Category | null, id: string) {
    if (!category)
      throw new NotFoundException(`Category with ID ${id} not found`);

    return category;
  }

  async create(createCategoryInput: CreateCategoryInput): Promise<Category> {
    const category = new this.categoryModel(createCategoryInput);
    return category.save();
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.categoryModel.findById(id).exec();

    return this.checkCategory(category, id);
  }

  async update(
    id: string,
    updateCategoryInput: UpdateCategoryInput,
  ): Promise<Category> {
    const updated = await this.categoryModel
      .findByIdAndUpdate(id, updateCategoryInput)
      .exec();

    return this.checkCategory(updated, id);
  }

  async remove(id: string): Promise<Category> {
    const removed = await this.categoryModel.findByIdAndDelete(id).exec();

    return this.checkCategory(removed, id);
  }
}
