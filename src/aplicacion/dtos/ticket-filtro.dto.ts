import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TicketFiltroDto {
  @Field({ nullable: true })
  descripcion?: string;

  @Field({ nullable: true })
  priority?: 'high' | 'medium' | 'low';

  @Field({ nullable: true })
  limite?: number;

  @Field({ nullable: true })
  offset?: number;
}
