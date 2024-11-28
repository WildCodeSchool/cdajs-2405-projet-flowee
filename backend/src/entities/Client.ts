import { ObjectType, Field, ID } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Project } from "./Project";

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
  @Field((type) => [Project])
  projects?: Project[];

  constructor(firstname: string, lastname: string) {
    super();
    this.firstname = firstname;
    this.lastname = lastname;
  }
}
