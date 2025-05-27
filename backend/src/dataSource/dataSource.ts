import { DataSource } from "typeorm";
import dotenv from "dotenv";
dotenv.config();

const dbHost = process.env.DB_HOST ?? "localhost";
const dbPort = Number.parseInt(process.env.DB_PORT ?? "5432", 10);
const dbName = process.env.DB_NAME ?? "flowee";
const dbUser = process.env.DB_USER ?? "postgres";
const dbPassword = process.env.DB_PASSWORD ?? "passwordadminer";

const isProd = process.env.NODE_ENV === "production";

export const dataSource = new DataSource({
  type: "postgres",
  host: dbHost,
  port: dbPort,
  database: dbName,
  username: dbUser,
  password: dbPassword,
  entities: ["src/entities/*.ts"],
  migrations: ["src/migration/*.ts"],
  migrationsTableName: "migrations",
  synchronize: false,
  logging: isProd ? ["error"] : "all", // Only log errors in production
});
