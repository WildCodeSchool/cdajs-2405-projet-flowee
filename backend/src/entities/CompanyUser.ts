import { ObjectType, Field, ID } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Project } from "./Project";
import { Account } from "./Account";
import { Compagny } from "./Compagny";

@ObjectType()
@Entity("company user")
export class CompanyUser extends BaseEntity {
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

  @OneToOne(() => Account)
  @JoinColumn()
  @Field((_) => Account)
  account?: Account;

  @ManyToOne(
    () => Compagny,
    (company) => company.companyUsers,
    { nullable: true, onDelete: "SET NULL" },
  )
  @Field((type) => Compagny, { nullable: true })
  company?: Compagny;

  constructor(firstname: string, lastname: string) {
    super();
    this.firstname = firstname;
    this.lastname = lastname;
  }
}
