import { ObjectType, Field, ID } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Project extends BaseEntity {
	@PrimaryGeneratedColumn()
	@Field((type) => ID)
	id?: number;

	@Column()
	@Field()
	name: string;

	@Column({ nullable: true })
	@Field({ nullable: true })
	author: string;

	@Column({ nullable: true })
	@Field({ nullable: true })
	description: string;

	@Column({ nullable: true })
	@Field({ nullable: true })
	startDate?: string;

	@Column({ nullable: true })
	@Field({ nullable: true })
	endDate?: string;

	constructor(
		name: string,
		author: string,
		description: string,
		startDate?: string,
		endDate?: string,
	) {
		super();

		this.name = name;
		this.author = author;
		this.description = description;
		this.startDate = startDate;
		this.endDate = endDate;
	}
}
