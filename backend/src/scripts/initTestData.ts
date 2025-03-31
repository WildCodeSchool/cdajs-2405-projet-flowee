import { dataSource } from "../dataSource/dataSource";
import { Project } from "../entities/Project";
import { Client } from "../entities/Client";
import { Account } from "../entities/Account";
import { Role } from "../enums/Role";
import { AccountStatus } from "../enums/AccountStatus";
import { ProjectStatus } from "../enums/ProjectStatus";

/**
 * Crée un projet de test complet avec account + client associés
 */
export async function CreateTestData(
  projectName: string,
  clientName: string,
  clientEmail: string,
  description: string,
  startDate: string,
  endDate: string,
) {
  const companyUserId = 2; // ou autre ID statique/temporaire pour test

  let account = await dataSource.manager.findOne(Account, {
    where: { email: clientEmail },
  });

  if (!account) {
    account = dataSource.manager.create(Account, {
      email: clientEmail,
      password: "changeme",
      role: Role.CLIENT,
      status: AccountStatus.PENDING,
    });
    await dataSource.manager.save(Account, account);
  }

  let client = await dataSource.manager.findOne(Client, {
    where: { account: { id: account.id } },
    relations: ["account"],
  });

  if (!client) {
    client = dataSource.manager.create(Client, {
      clientName,
      account,
    });
    await dataSource.manager.save(Client, client);
  }

  const project = dataSource.manager.create(Project, {
    projectName,
    description,
    startDate,
    endDate,
    status: ProjectStatus.NOT_STARTED,
    client,
    companyUserId,
  });

  await dataSource.manager.save(Project, project);

  console.log(`✅ Projet "${projectName}" créé avec client ${clientName}`);
}

export async function initTestData() {
  await CreateTestData(
    "Projet Site vitrine",
    "Cyrielle",
    "cyrielle@example.com",
    "Un site vitrine pour son activité freelance",
    "2024-10-23",
    "2025-04-10",
  );
  await CreateTestData(
    "Plateforme Coaching",
    "Alex",
    "alex.coach@example.com",
    "Plateforme pour réserver des séances de coaching",
    "2024-11-01",
    "2025-05-20",
  );
  await CreateTestData(
    "Application Nutrition",
    "Luis",
    "luis.nutri@example.com",
    "Application de suivi nutritionnel",
    "2024-10-15",
    "2025-03-30",
  );
  await CreateTestData(
    "Projet CRM pour PME",
    "Claire",
    "claire@pmecrm.fr",
    "Outil de gestion des relations client",
    "2024-09-01",
    "2025-01-15",
  );
}
