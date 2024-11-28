import { ObjectType, Field, ID } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import type { Status } from "../enums/Status";
import { Client } from "./Client";

@ObjectType()
@Entity()
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id?: number;

  @Column()
  @Field()
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  author: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  description: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  startDate?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  endDate?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  status?: Status;

  //relations
  @ManyToOne(
    () => Client,
    (client) => client.projects,
    { nullable: true, onDelete: "SET NULL" },
  )
  @Field((type) => Client, { nullable: true })
  client?: Client;

  constructor(
    name: string,
    author: string,
    description: string,
    startDate?: string,
    endDate?: string,
    status?: Status,
  ) {
    super();

    this.name = name;
    this.author = author;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.status = status;
  }
}
