import * as argon2 from "argon2";
import { Arg, Mutation, Resolver } from "type-graphql";
import { dataSource } from "../dataSource/dataSource";
import { Account } from "../entities/Account";
import { Company } from "../entities/Company";
import { CompanyUser } from "../entities/CompanyUser";
import { AccountStatus } from "../enums/AccountStatus";
import { Role } from "../enums/Role";
import { InitAdminProdInput } from "../inputs/InitAdminProdInput";

@Resolver()
export class Initmutation {
  @Mutation(() => Boolean)
  async initAdmin(
    @Arg("data", () => InitAdminProdInput) data: InitAdminProdInput,
  ): Promise<boolean> {
    const {
      secret,
      companyName,
      companyAddress,
      contactInfo,
      email,
      password,
      firstname,
      lastname,
    } = data;
    if (process.env.NODE_ENV !== "production") {
      throw new Error("Only available in production");
    }

    const secretkey = process.env.INIT_SECRET;
    console.info("ENV INIT_SECRET:", process.env.INIT_SECRET);
    console.info(secretkey);
    if (secret !== process.env.INIT_SECRET) {
      throw new Error("Unauthorized");
    }

    const existingCompany = await dataSource.manager.count(Company);
    if (existingCompany > 0) {
      throw new Error("Initialization already done");
    }

    const company = await dataSource.manager.save(Company, {
      name: companyName,
      address: companyAddress,
      contactInfo,
      createdAt: new Date(),
    });

    const hashedPassword = await argon2.hash(password);
    const account = await dataSource.manager.save(Account, {
      email,
      password: hashedPassword,
      role: Role.ADMIN,
      status: AccountStatus.ACTIVE,
    });

    await dataSource.manager.save(CompanyUser, {
      firstname,
      lastname,
      account,
      company,
    });

    return true;
  }
}
