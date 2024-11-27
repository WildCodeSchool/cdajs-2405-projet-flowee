import { ObjectType, Field, ID } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Deliverable } from "./Deliverable";

export enum Status {
  NOT_STARTED = "NOT_STARTED",
  BLOCKED = "BLOCKED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

@ObjectType()
@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id?: number;

  @Column()
  @Field()
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  description!: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  status?: Status;

  @Column({ nullable: true })
  @Field({ nullable: true })
  startDate?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  endDate?: string;

  //relations
  @ManyToOne(
    () => Deliverable,
    (deliverable) => deliverable.tasks,
    { eager: true },
  )
  @Field((type) => Deliverable)
  deliverable!: Deliverable;

  constructor(
    name: string,
    description: string,
    startDate?: string,
    endDate?: string,
    status?: Status,
  ) {
    super();

    this.name = name;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.status = status;
  }
}
