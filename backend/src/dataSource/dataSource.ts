import { DataSource } from "typeorm";
import { Project } from "../entities/Project";
import dotenv from "dotenv";
// import type { Client } from "../entities/Client";
import { Deliverable } from "../entities/Deliverable";
import type { ProjectStatus } from "../enums/ProjectStatus";
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

//Create a new deliverable

export async function CreateDeliverableTestData(
  name: string,
  perimeter: string,
  deliveryDate?: string,
  status?: ProjectStatus,
  createdAt?: string,
  reviewTimes?: number,
) {
  const deliverable = new Deliverable(
    name,
    perimeter,
    deliveryDate,
    status,
    createdAt,
    reviewTimes,
  );
  console.info("new deliverable: ", deliverable);
  await dataSource.manager.save(deliverable);
}
