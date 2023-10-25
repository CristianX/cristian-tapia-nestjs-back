import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SearchTicketsDto {
  @Field()
  start: Date;

  @Field()
  end: Date;

  @Field({ nullable: true })
  priority?: 'high' | 'medium' | 'low';

  @Field({ nullable: true })
  category?: 'incident' | 'support' | 'error';

  @Field({ nullable: true })
  status?: 'pending' | 'verified' | 'approved' | 'rejected';

  @Field({ nullable: true })
  skip?: number;

  @Field({ nullable: true })
  limit?: number;
}
