import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Project extends BaseEntity {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column()
	name: string;

	@Column({ nullable: true })
	description?: string;

	@Column({ nullable: true })
	startDate?: Date;

	@Column({ nullable: true })
	endDate?: Date;

	constructor(
		name: string,
		description: string | undefined = undefined,
		startDate?: Date,
		endDate?: Date,
	) {
		super();

		this.name = name;
		this.description = description;
		this.startDate = startDate;
		this.endDate = endDate;
	}
}
