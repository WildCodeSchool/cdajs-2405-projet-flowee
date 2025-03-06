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

@ObjectType()
@Entity("account")
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id?: number;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  password: string;

  @Column()
  @Field()
  role: Role;

  @OneToOne(
    () => Client,
    (client) => client.account,
  )
  client?: Client;

  constructor(email: string, password: string, role: Role) {
    super();
    this.email = email;
    this.password = password;
    this.role = role;
  }
}
