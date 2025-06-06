import { Field, ID, ObjectType } from "type-graphql";

import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ClientStatus } from "../enums/ClientStatus";
import { Account } from "./Account";
import { Project } from "./Project";

@ObjectType()
@Entity("client")
export class Client extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id?: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  clientName: string;

  @Column({ nullable: true, default: ClientStatus.INACTIVE })
  @Field(() => ClientStatus, { nullable: true })
  status?: ClientStatus;

  @OneToMany(
    () => Project,
    (project) => project.client,
    { eager: true },
  )
  projects?: Project[];

  @OneToOne(() => Account, { eager: true })
  @JoinColumn({ name: "account_id" })
  @Index({ unique: true })
  @Field(() => Account, { nullable: true })
  account?: Account;

  constructor(clientName: string, account: Account) {
    super();
    this.clientName = clientName;
    this.account = account;
  }
}
