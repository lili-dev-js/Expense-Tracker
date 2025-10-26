import { Resolver, Query } from '@nestjs/graphql';
import { Category } from './schemas/category.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  @Query(() => [Category])
  async category(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }
}
