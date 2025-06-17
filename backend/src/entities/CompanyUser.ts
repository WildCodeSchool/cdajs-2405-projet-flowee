import { Field, ID, ObjectType } from "type-graphql";
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
import { Account } from "./Account";
import { Company } from "./Company";
import { Project } from "./Project";

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
  projects?: Project[];

  @OneToOne(() => Account)
  @JoinColumn({ name: "account_id" }) // la clé étrangère est ici
  @Field((_) => Account)
  account?: Account;

  @ManyToOne(
    () => Company,
    (company) => company.companyUsers,
    { nullable: true, onDelete: "SET NULL" },
  )
  @Field(() => Company, { nullable: true })
  company?: Company;

  constructor(firstname: string, lastname: string) {
    super();
    this.firstname = firstname;
    this.lastname = lastname;
  }
}
