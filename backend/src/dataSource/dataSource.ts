import { DataSource } from "typeorm";
import { Project } from "../entities/Project";
import dotenv from "dotenv";
import { Client } from "../entities/Client";
import { Deliverable } from "../entities/Deliverable";
import type { Status } from "../enums/Status";
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

// Create a new client
export async function CreateClientTestData(name: string, accountId: number) {
  const client = new Client(name, accountId);

  console.log("new client: ", client);
  await dataSource.manager.save(client);
  return client;
}

//Create a new deliverable

export async function CreateDeliverableTestData(
  name: string,
  perimeter: string,
  deliveryDate?: string,
  status?: Status,
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
  console.log("new deliverable: ", deliverable);
  await dataSource.manager.save(deliverable);
}

//Create a new task

// Create a new project
export async function CreateProjectTestData(
  name: string,
  author: string,
  description: string,
  startDate: string,
  endDate: string,
  client?: Client,
) {
  const project = new Project(name, description, author, startDate, endDate);
  project.client = client;
  console.log("new project: ", project);
  await dataSource.manager.save(project);
}

// Create test data
// export async function initTestData() {
//   const client1 = await CreateClientTestData("ClientDutonerre", 1);
//   const client2 = await CreateClientTestData("clientGenial", 2);

//   // const client3 = await CreateClientTestData("Louis", "Grignon");

//   // const client4 = await CreateClientTestData("Julien", "Privat");

//   // const client5 = await CreateClientTestData("Jean", "Dupont");
//   // const client6 = await CreateClientTestData("Nelson", "Almeida");

//   // const client7 = await CreateClientTestData("Clara", "Decocq");
//   // const client8 = await CreateClientTestData("Joël", "Fournier");

//   await CreateDeliverableTestData(
//     "Deliverable 1",
//     "Ceci est mon premier deliverable",
//     "2024-10-23",
//     Status.IN_PROGRESS,
//     "2024-10-23",
//     2,
//   );
//   await CreateDeliverableTestData(
//     "Deliverable 2",
//     "Ceci est mon deuxième deliverable",
//     "2024-10-23",
//     Status.IN_PROGRESS,
//     "2024-10-23",
//     4,
//   );
//   await CreateDeliverableTestData(
//     "Deliverable 3",
//     "Ceci est mon 3ème deliverable",
//     "2024-10-18",
//     Status.NOT_STARTED,
//     "2024-10-23",
//     2,
//   );
//   await CreateDeliverableTestData(
//     "Deliverable 4",
//     "Ceci est mon 3ème deliverable",
//     "2024-10-23",
//     Status.NOT_STARTED,
//     "2024-10-23",
//     1,
//   );
//   await CreateDeliverableTestData(
//     "Deliverable 5",
//     "Ceci est mon meilleur deliverable",
//     "2024-10-23",
//     Status.NOT_STARTED,
//     "2024-10-23",
//     3,
//   );
//   await CreateDeliverableTestData(
//     "Deliverable 6",
//     "Ceci est mon plus beau deliverable",
//     "2024-12-23",
//     Status.NOT_STARTED,
//     "2024-10-23",
//     4,
//   );
//   await CreateDeliverableTestData(
//     "Deliverable 7",
//     "Ceci est mon magnifique deliverable",
//     "2023-10-18",
//     Status.COMPLETED,
//     "2024-10-23",
//     6,
//   );
//   await CreateDeliverableTestData(
//     "Deliverable 8",
//     "Ceci est le deliverable de ma vie",
//     "2025-10-23",
//     Status.COMPLETED,
//     "2024-10-23",
//     5,
//   );

//   await CreateProjectTestData(
//     "Projet 1",
//     "Ceci est mon premier projet",
//     "Cyrielle",
//     "2024-10-23",
//     "2025-10-23",
//     client7,
//   );
//   await CreateProjectTestData(
//     "Projet 2",
//     "Ceci est mon deuxième projet",
//     "Alex",
//     "2024-10-23",
//     "2025-10-23",
//     client2,
//   );
//   await CreateProjectTestData(
//     "Projet 3",
//     "Ceci est mon 3ème projet",
//     "Luis",
//     "2024-10-18",
//     "2025-10-23",
//     client3,
//   );

//   await CreateProjectTestData(
//     "Projet 4",
//     "Ceci est mon 3ème projet",
//     "Azraël",
//     "2024-10-23",
//     "2025-10-22",
//     client4,
//   );

//   await CreateProjectTestData(
//     "Projet 5",
//     "Ceci est mon meilleur projet",
//     "Cyrielle",
//     "2024-10-23",
//     "2025-10-31",
//     client5,
//   );
//   await CreateProjectTestData(
//     "Projet 6",
//     "Ceci est mon plus beau projet",
//     "Alex",
//     "2024-12-23",
//     "2026-10-12",
//     client6,
//   );
//   await CreateProjectTestData(
//     "Projet 7",
//     "Ceci est mon magnifique projet",
//     "Luis",
//     "2023-10-18",
//     "2024-04-15",
//     client1,
//   );

//   await CreateProjectTestData(
//     "Projet 8",
//     "Ceci est le projet de ma vie",
//     "Azraël",
//     "2025-10-23",
//     "2026-08-22",
//     client8,
//   );
// }
