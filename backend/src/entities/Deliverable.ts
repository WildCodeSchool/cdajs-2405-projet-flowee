import { ObjectType, Field, ID } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Task } from "./Task";
import type { Status } from "../enums/Status";

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
  deliveryDate?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  status?: Status;

  @Column({ nullable: true })
  @Field({ nullable: true })
  createdAt?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  reviewTimes?: number;

  //relations
  @OneToMany(
    () => Task,
    (task) => task.deliverable,
  )
  @Field(() => [Task])
  tasks?: Task[];

  constructor(
    name: string,
    perimeter?: string,
    deliveryDate?: string,
    status?: Status,
    createdAt?: string,
    reviewTimes?: number,
  ) {
    super();

    this.name = name;
    this.perimeter = perimeter;
    this.deliveryDate = deliveryDate;
    this.status = status;
    this.createdAt = createdAt;
    this.reviewTimes = reviewTimes;
  }
}
