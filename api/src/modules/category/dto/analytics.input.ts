import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AnalyticsInput {
  @Field()
  startDate: Date;

  @Field()
  endDate: Date;
}
