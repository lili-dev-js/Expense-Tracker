import { Resolver, Query } from '@nestjs/graphql';
import { Author } from './schemas/author.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Resolver(() => Author)
export class AuthorsResolver {
  constructor(@InjectModel(Author.name) private authorModel: Model<Author>) {}

  @Query(() => [Author])
  async authors(): Promise<Author[]> {
    return this.authorModel.find().exec();
  }
}
