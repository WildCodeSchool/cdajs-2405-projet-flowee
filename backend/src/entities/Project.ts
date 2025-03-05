import { ObjectType, Field, ID } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IsEmail, IsNotEmpty } from "class-validator";
import { Status } from "../enums/Status";
import { Client } from "./Client";
import { CompanyUser } from "./CompanyUser";

@ObjectType()
@Entity()
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id?: number;

  @Column({ nullable: false })
  @Field()
  @IsNotEmpty({ message: "Project Name is required" })
  name: string;

  @Column({ nullable: false })
  @Field()
  @IsEmail({}, { message: "Invalid email format" })
  clientEmail: string;

  @Column()
  @Field()
  @IsNotEmpty({ message: "company user ID is required" })
  companyUserId: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  startDate?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  endDate?: string;

  @Column({ default: Status.NOT_STARTED })
  @Field({ nullable: true })
  status?: Status;

  //relations
  @ManyToOne(
    () => Client,
    (client) => client.projects,
    { nullable: true, onDelete: "SET NULL" },
  )
  @Field(() => Client, { nullable: true })
  client?: Client;

  @ManyToOne(
    () => CompanyUser,
    (companyUser) => companyUser.projects,
    { nullable: true, onDelete: "SET NULL" },
  )
  @Field(() => CompanyUser, { nullable: true })
  companyUser?: CompanyUser;

  constructor(
    name: string,
    clientEmail: string,
    companyUserId: number,
    description?: string,
    startDate?: string,
    endDate?: string,
    status?: Status,
  ) {
    super();

    this.name = name;
    this.clientEmail = clientEmail;
    this.companyUserId = companyUserId;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.status = status;
  }
}
