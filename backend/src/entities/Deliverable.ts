import { ObjectType, Field, ID } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Task } from "./Task";
import type { Status } from "./Task";

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
  deliveryDate?: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  status?: Status;

  @Column()
  @Field()
  createdAt?: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  reviewTimes?: number;

  //relations
  @OneToMany(
    () => Task,
    (task) => task.deliverable,
  )
  @Field((type) => [Task])
  tasks?: Promise<Task[]>;

  constructor(
    name: string,
    perimeter?: string,
    deliveryDate?: Date,
    status?: Status,
    createdAt?: Date,
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
