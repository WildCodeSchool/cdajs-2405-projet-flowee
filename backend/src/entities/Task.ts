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
  PENDING = "PENDING",
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
  description?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  status?: Status;

  @Column({ nullable: true })
  @Field({ nullable: true })
  startDate?: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  endDate?: Date;

  // @Column()
  // @Field()
  // deliverableId: number;

  //relations
  @ManyToOne(() => Deliverable, (deliverable) => deliverable.tasks)
  deliverable!: Deliverable;
  constructor(
    name: string,
    // deliverableId: number,
    description: string | undefined = undefined,
    startDate?: Date,
    endDate?: Date,

    status?: Status
  ) {
    super();

    this.name = name;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    // this.deliverableId = deliverableId;
    this.status = status;
  }
}
