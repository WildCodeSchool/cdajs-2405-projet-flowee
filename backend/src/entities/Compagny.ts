import { ObjectType, Field, ID } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";

@ObjectType()
@Entity("compagny")
export class Compagny extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id?: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  address: string;

  @Column()
  @Field()
  contactInfo: string;

  @Column()
  @Field()
  createdAt?: Date;

  constructor(name: string, address: string, contactInfo: string) {
    super();
    this.name = name;
    this.address = address;
    this.contactInfo = contactInfo;
  }
}
