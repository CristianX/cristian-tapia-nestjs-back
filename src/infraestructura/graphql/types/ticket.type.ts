import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum Priority {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

export enum Category {
  INCIDENT = 'incident',
  SUPPORT = 'support',
  ERROR = 'error',
}

export enum Status {
  PENDING = 'pending',
  VERIFIED = 'verified',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

registerEnumType(Priority, {
  name: 'Priority',
});

registerEnumType(Category, {
  name: 'Category',
});

registerEnumType(Status, {
  name: 'Status',
});

@ObjectType()
export class TicketType {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => Priority)
  priority: Priority;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => Category)
  category: Category;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => Status)
  status: Status;
}
