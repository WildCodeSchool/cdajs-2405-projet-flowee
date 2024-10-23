import { DataSource } from "typeorm";

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
