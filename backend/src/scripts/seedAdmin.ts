import "reflect-metadata";
import * as argon2 from "argon2";
import { dataSource } from "../dataSource/dataSource";
import { Account } from "../entities/Account";
import { Company } from "../entities/Company";
import { CompanyUser } from "../entities/CompanyUser";
import { AccountStatus } from "../enums/AccountStatus";
import { Role } from "../enums/Role";

async function seed() {
  await dataSource.initialize();

  const company = dataSource.manager.create(Company, {
    name: "Flowee Corp",
    address: "123 rue des projets",
    contactInfo: "contact@flowee.io",
    createdAt: new Date(),
  });
  await dataSource.manager.save(company);

  const hashedPassword = await argon2.hash("admin123");
  const account = dataSource.manager.create(Account, {
    email: "admin@flowee.io",
    password: hashedPassword,
    role: Role.ADMIN,
    status: AccountStatus.ACTIVE,
  });
  await dataSource.manager.save(account);

  const adminUser = dataSource.manager.create(CompanyUser, {
    firstname: "Cyrielle",
    lastname: "Admin",
    account,
    company,
  });
  await dataSource.manager.save(adminUser);

  console.log("✅ Admin seeded !");
  await dataSource.destroy();
}

seed().catch((err) => {
  console.error("❌ Échec du seed :", err);
  process.exit(1);
});
