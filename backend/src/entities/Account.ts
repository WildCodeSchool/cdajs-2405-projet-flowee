import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AccountStatus } from "../enums/AccountStatus";
import type { Role } from "../enums/Role";
import { Client } from "./Client";
import { CompanyUser } from "./CompanyUser";
import { IsEmail } from "class-validator";

@ObjectType()
@Entity("account")
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id?: number;

  @Column()
  @Field()
  @IsEmail({}, { message: "L'email n'est pas valide" })
  email: string;

  @Column() //no @Field  here to avoid being exposed in queries and mutations. Still available in backend
  password: string;

  @Column()
  @Field()
  role: Role;

  @Column({ nullable: true })
  activationToken?: string;

  @Column({ nullable: true })
  tokenExpiresAt?: Date;

  @Column({ type: "enum", enum: AccountStatus, default: AccountStatus.PENDING })
  @Field(() => AccountStatus)
  status: AccountStatus;

  @OneToOne(
    () => Client,
    (client) => client.account,
    {
      nullable: true,
    },
  )
  @Field(() => Client, { nullable: true })
  client?: Client;

  @OneToOne(
    () => CompanyUser,
    (companyUser) => companyUser.account,
    {
      nullable: true,
    },
  )
  @Field(() => CompanyUser, { nullable: true })
  companyUser?: CompanyUser;

  constructor(
    email: string,
    password: string,
    role: Role,
    status: AccountStatus,
  ) {
    super();
    this.email = email;
    this.password = password;
    this.role = role;
    this.status = status;
  }
}
