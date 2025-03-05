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

  @Column()
  @Field()
  firstname: string;

  @Column()
  @Field()
  lastname: string;

  @OneToMany(
    () => Project,
    (project) => project.client,
  )
  @Field(() => [Project])
  projects?: Project[];

  @OneToOne(() => Account)
  @JoinColumn()
  account?: Account;

  constructor(firstname: string, lastname: string) {
    super();
    this.firstname = firstname;
    this.lastname = lastname;
  }
}
