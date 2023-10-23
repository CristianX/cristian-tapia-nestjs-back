import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TicketType {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => ID)
  id: number;

  @Field()
  descripcion: string;
}
