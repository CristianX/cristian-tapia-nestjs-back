import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TicketFiltroDto {
  @Field({ nullable: true })
  descripcion?: string;

  @Field({ nullable: true })
  limite?: number;

  @Field({ nullable: true })
  offset?: number;
}
