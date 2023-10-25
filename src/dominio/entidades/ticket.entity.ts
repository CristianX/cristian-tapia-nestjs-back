import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// src/tickets/tickets.entity.ts
@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  priority: string;

  @Column()
  category: string;

  @Column()
  status: string;
}
