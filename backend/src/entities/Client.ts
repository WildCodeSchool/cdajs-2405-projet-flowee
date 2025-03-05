import { ObjectType, Field, ID } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Project } from "./Project";
import { Account } from "./Account";

@ObjectType()
@Entity("client")
export class Client extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id?: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  name: string;

  @OneToMany(
    () => Project,
    (project) => project.client,
    { eager: true },
  )
  projects?: Project[];

  @OneToOne(() => Account, { eager: true })
  @JoinColumn({ name: "account_id" })
  @Field(() => Account, { nullable: true })
  account?: Account;

  constructor(name: string, account: Account) {
    super();
    this.name = name;
    this.account = account;
  }
}
