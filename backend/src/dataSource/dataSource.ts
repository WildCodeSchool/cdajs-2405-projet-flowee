import { DataSource } from "typeorm";
import { Project } from "../entities/Project";

const dbHost: string = process.env.DB_HOST || "";
const dbPort: number = Number.parseInt(process.env.DB_PORT || "", 10);
const dbName: string = process.env.DB_NAME || "";
const dbUser: string = process.env.DB_USER || "";
const dbPassword: string = process.env.DB_PASSWORD || "";

export const dataSource = new DataSource({
	type: "postgres",
	host: dbHost,
	port: dbPort,
	database: dbName,
	username: dbUser,
	password: dbPassword,
	entities: ["src/entities/*.ts"],
	synchronize: true,
	logging: "all",
});

export async function cleanDB() {
	await dataSource.manager.clear(Project);
}

export async function initTestData(
	name: string,
	description: string,
	startDate: Date,
	endDate: Date,
) {
	const project1 = new Project(
		"Project One",
		"Ceci est mon premier projet",
		new Date("2024-10-23"),
		new Date("2025-10-23"),
	);

	const project2 = new Project(
		"Project Two",
		"Un super projet",
		new Date("2024-10-23"),
		new Date("2025-10-23"),
	);

	const project3 = new Project(
		"Project Three",
		"Encore meilleur",
		new Date("2024-10-23"),
		new Date("2025-10-23"),
	);
	await dataSource.manager.save(project1);
	await dataSource.manager.save(project2);
	await dataSource.manager.save(project3);
}
