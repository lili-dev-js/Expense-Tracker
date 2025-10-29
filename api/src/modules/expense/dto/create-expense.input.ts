import {
  InputType,
  Field,
  Float,
  ID,
  PartialType,
  GraphQLISODateTime,
} from '@nestjs/graphql';

@InputType()
export class CreateExpenseInput {
  @Field(() => String, { description: 'Name of the expense' })
  name: string;

  @Field(() => Float, { description: 'Amount of the expense' })
  amount: number;

  @Field(() => ID, { description: 'Category ID for this expense' })
  category: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  paymentDate?: Date;
}

@InputType()
export class UpdateExpenseInput extends PartialType(CreateExpenseInput) {
  @Field(() => ID, { description: 'Expense ID to update' })
  id: string;
}
