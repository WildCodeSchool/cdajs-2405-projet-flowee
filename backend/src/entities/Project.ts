import { IsNotEmpty } from "class-validator";
import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { ProjectStatus } from "../enums/ProjectStatus";
import { Client } from "./Client";
import { CompanyUser } from "./CompanyUser";
import { Deliverable } from "./Deliverable";

@ObjectType()
@Entity()
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id?: number;

  @Column({ nullable: true })
  @Field()
  @IsNotEmpty({ message: "Project Name is required" })
  projectName: string;

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

  @Column({ default: ProjectStatus.NOT_STARTED })
  @Field(() => ProjectStatus, { nullable: true })
  status?: ProjectStatus;

  //relations
  @OneToMany(
    () => Deliverable,
    (deliverable) => deliverable.project,
  )
  @Field(() => [Deliverable], { nullable: true })
  deliverables?: Deliverable[];

  @ManyToOne(
    () => Client,
    (client) => client.projects,
    { nullable: false },
  )
  @Field(() => Client)
  client?: Client;

  @ManyToOne(
    () => CompanyUser,
    (companyUser) => companyUser.projects,
    {
      nullable: true,
      onDelete: "SET NULL",
    },
  )
  @Field(() => CompanyUser, { nullable: true })
  companyUser?: CompanyUser;

  constructor(
    projectName: string,
    companyUserId: number,
    description?: string,
    startDate?: string,
    endDate?: string,
    status?: ProjectStatus,
  ) {
    super();

    this.projectName = projectName;
    this.companyUserId = companyUserId;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.status = status;
  }
}
