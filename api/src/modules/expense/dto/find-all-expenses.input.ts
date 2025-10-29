import { InputType, Field, Int } from '@nestjs/graphql';
import { IsOptional, IsMongoId, IsIn, IsInt, Min } from 'class-validator';

@InputType()
export class FindAllExpensesInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsMongoId({ message: 'Invalid category ID format' })
  categoryId?: string;

  @Field({ nullable: true, defaultValue: 'createdAt' })
  @IsOptional()
  @IsIn(['createdAt', 'updatedAt'])
  sortBy?: 'createdAt' | 'updatedAt' = 'createdAt';

  @Field({ nullable: true, defaultValue: 'desc' })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc' = 'desc';

  @Field(() => Int, { nullable: true, defaultValue: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = 1;

  @Field(() => Int, { nullable: true, defaultValue: 10 })
  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number = 10;
}
