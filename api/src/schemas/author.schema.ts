import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType() // 👈 Dla GraphQL
@Schema() // 👈 Dla Mongoose
export class Author extends Document {
  @Field(() => ID)
  declare _id: string;

  @Field()
  @Prop({ required: true })
  name: string;

  @Field({ nullable: true })
  @Prop()
  age?: number;
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
