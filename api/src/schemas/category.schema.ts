import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Expense } from './expense.schema';

@ObjectType()
@Schema({ timestamps: true })
export class Category extends Document {
  @Field(() => ID)
  declare _id: string;

  @Field()
  @Prop({ required: true })
  name: string;

  @Field(() => [Expense], { nullable: true })
  expenses?: Expense[];

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
