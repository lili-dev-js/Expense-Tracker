// expense.schema.ts
import { Category } from './category.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
@Schema({ timestamps: true })
export class Expense extends Document {
  @Field(() => ID)
  declare _id: string;

  @Field()
  @Prop({ required: true })
  name: string;

  @Field({ nullable: true })
  @Prop()
  amount?: number;

  @Field(() => Category, { nullable: true })
  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  category?: Category;

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);
