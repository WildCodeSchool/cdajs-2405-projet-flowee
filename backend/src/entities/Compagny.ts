import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CompanyUser } from "./CompanyUser";

@ObjectType()
@Entity("compagny")
export class Compagny extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id?: number;

  @Column()
  @Field()
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  address: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  contactInfo: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  createdAt?: Date;

  @OneToMany(
    () => CompanyUser,
    (companyUser) => companyUser.company,
  )
  @Field(() => [CompanyUser])
  companyUsers?: CompanyUser[];

  constructor(name: string, address: string, contactInfo: string) {
    super();
    this.name = name;
    this.address = address;
    this.contactInfo = contactInfo;
  }
}
