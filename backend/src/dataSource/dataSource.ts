import dotenv from "dotenv";
import { DataSource } from "typeorm";
dotenv.config();

const dbHost = process.env.DB_HOST ?? "localhost";
const dbPort = Number.parseInt(process.env.DB_PORT ?? "5432", 10);
const dbName = process.env.DB_NAME ?? "flowee";
const dbUser = process.env.DB_USER ?? "postgres";
const dbPassword = process.env.DB_PASSWORD ?? "passwordadminer";
console.info("dbPassword", dbPassword, dbUser, dbName, dbHost, dbPort);

const isProd =
  process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging";

export const dataSource = new DataSource({
  type: "postgres",
  host: dbHost,
  port: dbPort,
  database: dbName,
  username: dbUser,
  password: dbPassword,
  schema: "public",
  entities: [isProd ? "build/entities/*.js" : "src/entities/*.ts"],
  migrations: [isProd ? "build/migration/*.js" : "src/migration/*.ts"],
  migrationsTableName: "migrations",
  synchronize: false,
  logging: isProd ? ["error"] : "all", // Only log errors in production
});
