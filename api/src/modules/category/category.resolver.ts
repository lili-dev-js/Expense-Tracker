import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Category } from '../../schemas/category.schema';
import { CategoryService } from './category.service';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { CategoryAnalytics } from './dto/category-analytics.output';
import { AnalyticsInput } from './dto/analytics.input';
import { AnalyticsService } from './analitic.service';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly analyticsService: AnalyticsService,
  ) {}

  @Query(() => [Category], { name: 'findAllCategories' })
  async findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Query(() => Category, { name: 'findCategory' })
  async findOne(@Args('id', { type: () => ID }) id: string): Promise<Category> {
    return this.categoryService.findOne(id);
  }

  @Mutation(() => Category, { name: 'createCategory' })
  async create(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
  ): Promise<Category> {
    return this.categoryService.create(createCategoryInput);
  }

  @Mutation(() => Category, { name: 'updateCategory' })
  async update(
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput,
  ): Promise<Category> {
    return this.categoryService.update(
      updateCategoryInput._id,
      updateCategoryInput,
    );
  }

  @Mutation(() => Category, { name: 'removeCategory' })
  async remove(@Args('id', { type: () => ID }) id: string): Promise<Category> {
    return this.categoryService.remove(id);
  }

  @Query(() => CategoryAnalytics)
  categoryAnalytics(
    @Args('input') input: AnalyticsInput,
  ): Promise<CategoryAnalytics> {
    return this.analyticsService.getCategoryTotals(input);
  }
}
