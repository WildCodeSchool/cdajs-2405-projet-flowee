import { ObjectType, Field, ID } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum TaskStatus {
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
  status?: TaskStatus;

  @Column({ nullable: true })
  @Field({ nullable: true })
  startDate?: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  endDate?: Date;

  // @Column()
  // @Field()
  // deliverableId: number;

  constructor(
    name: string,
    // deliverableId: number,
    description: string | undefined = undefined,
    startDate?: Date,
    endDate?: Date,

    status?: TaskStatus
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
