import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TicketCreateDTO {
  @Field()
  readonly descripcion: string;
}
