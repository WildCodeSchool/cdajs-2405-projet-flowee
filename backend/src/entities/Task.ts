import { ObjectType, Field, ID } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Deliverable } from "./Deliverable";
import type { ProjectStatus } from "../enums/ProjectStatus";

@ObjectType()
@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id?: number;

  @Column()
  @Field()
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  description!: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  status?: ProjectStatus;

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
    { nullable: true, onDelete: "SET NULL" },
  )
  @Field(() => Deliverable, { nullable: true })
  deliverable?: Deliverable;

  constructor(
    name: string,
    description: string,
    startDate?: string,
    endDate?: string,
    status?: ProjectStatus,
  ) {
    super();

    this.name = name;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.status = status;
  }
}
