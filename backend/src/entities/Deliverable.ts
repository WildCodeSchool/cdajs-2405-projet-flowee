import { ObjectType, Field, ID } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Task } from "./Task";

import { Project } from "./Project";
import type { DeliverableStatus } from "../enums/DeliverableStatus";

@ObjectType()
@Entity()
export class Deliverable extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field((_) => ID)
  id?: number;

  @Column()
  @Field()
  name: string;

  //J'ai mis perimeter au lieu de description pour que ça soit plus parlant
  @Column({ nullable: true })
  @Field({ nullable: true })
  perimeter?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  endDate?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  status?: DeliverableStatus;

  @Column({ nullable: true })
  @Field({ nullable: true })
  createdAt?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  reviewTimes?: number;

  //relations
  @ManyToOne(
    () => Project,
    (project) => project.deliverables,
  )
  @Field(() => Project, { nullable: true })
  project?: Project;

  @OneToMany(
    () => Task,
    (task) => task.deliverable,
  )
  @Field(() => [Task], { nullable: true })
  tasks?: Task[];

  constructor(
    name: string,
    perimeter?: string,
    deliveryDate?: string,
    status?: DeliverableStatus,
    createdAt?: string,
    reviewTimes?: number,
  ) {
    super();

    this.name = name;
    this.perimeter = perimeter;
    this.endDate = deliveryDate;
    this.status = status;
    this.createdAt = createdAt;
    this.reviewTimes = reviewTimes;
  }
}
