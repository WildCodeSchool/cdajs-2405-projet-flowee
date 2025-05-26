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

@ObjectType()
@Entity("account")
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id?: number;

  @Column()
  @Field()
  email: string;

  @Column() // pas de @Field ici pour éviter de l'exposer
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
  )
  @Field(() => Client)
  client!: Client;

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
