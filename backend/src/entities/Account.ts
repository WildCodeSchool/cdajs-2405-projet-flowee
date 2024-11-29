import { ObjectType, Field, ID } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Project } from "./Project";
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

  @OneToMany(
    () => Project,
    (project) => project.client,
  )
  @Field((type) => [Project])
  projects?: Project[];

  constructor(email: string, password: string, role: Role) {
    super();
    this.email = email;
    this.password = password;
    this.role = role;
  }
}
