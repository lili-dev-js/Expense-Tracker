import { ObjectType, Field, Float, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class SumSegmentCategory {
  @Field(() => Float)
  totalAmount: number;

  @Field(() => Int)
  index: number;
}

@ObjectType()
export class SumCategory {
  @Field(() => ID)
  categoryId: string;

  @Field()
  categoryName: string;

  @Field(() => [SumSegmentCategory])
  segments: SumSegmentCategory[];
}

@ObjectType()
export class CategoryAnalytics {
  @Field(() => [SumCategory])
  categoryAnalytics: SumCategory[];

  @Field(() => [Date])
  segmentDates: Date[];
}
