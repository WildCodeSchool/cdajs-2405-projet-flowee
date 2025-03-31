import { ObjectType, Field, ID } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Client } from "./Client";
import type { Role } from "../enums/Role";
import { AccountStatus } from "../enums/AccountStatus";

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

  @Column({ type: "enum", enum: AccountStatus, default: AccountStatus.PENDING })
  @Field(() => AccountStatus)
  status: AccountStatus;

  @OneToOne(
    () => Client,
    (client) => client.account,
  )
  client?: Client;

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
