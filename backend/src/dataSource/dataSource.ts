import { DataSource } from "typeorm";
import { Project } from "../entities/Project";
import dotenv from "dotenv";
dotenv.config();

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

export async function CreateTestData(
  name: string,
  author: string,
  description: string,
  startDate: string,
  endDate: string,
) {
  const project = new Project(name, description, author, startDate, endDate);
  console.log("j'ai créé de la data dand datasource", project);
  await dataSource.manager.save(project);
}

export async function initTestData() {
  await CreateTestData(
    "Projet1",
    "Cyrielle",
    "Ceci est mon premier projet",
    "2024-10-23",
    "2025-10-23",
  );
  await CreateTestData(
    "Projet2",
    "Alex",
    "Ceci est mon deuxième projet",
    "2024-10-23",
    "2025-10-23",
  );
  await CreateTestData(
    "Projet3",
    "Luis",
    "Ceci est mon 3ème projet",
    "2024-10-23",
    "2025-10-23",
  );
}
