import { dataSource } from "../dataSource/dataSource";
import { Account } from "../entities/Account";
import { Mutation, Arg, Resolver } from "type-graphql";
import type { Role } from "../enums/Role";
import { AccountStatus } from "../enums/AccountStatus";
import argon2 from "argon2";
import {
  generateClientToken,
  generateCompanyUserToken,
} from "../middlewares/auth";
import { Client } from "../entities/Client";
import { CompanyUser } from "../entities/CompanyUser";
import {
  clearActivationToken,
  isActivationTokenExpired,
} from "../utils/accesstoken";
@Resolver(Account)
export class AccountMutation {
  //Account  creation
  @Mutation(() => Account)
  async createAccount(
    @Arg("email") email: string,
    @Arg("password") password: string, // A modifier - stocké en clair temporairement
    @Arg("role") role: Role,
  ): Promise<Account> {
    try {
      // Vérification si l'email existe déjà
      const existingAccount = await dataSource.manager.findOne(Account, {
        where: { email },
      });
      if (existingAccount) {
        throw new Error("Email already exists");
      }

      const hashedPassword = await argon2.hash(password);

      // Création du Account
      const newAccount = new Account(
        email,
        hashedPassword,
        role,
        AccountStatus.PENDING,
      );

      await dataSource.manager.save(newAccount);
      return newAccount;
    } catch (error) {
      console.error("Error creating account:", error);
      throw new Error("Failed to create account");
    }
  }

  @Mutation(() => Boolean)
  async activateAccount(@Arg("token") token: string): Promise<boolean> {
    console.info("token dans le back", token);
    try {
      const account = await dataSource.manager.findOne(Account, {
        where: { activationToken: token },
      });

      console.info(account);

      if (!account) {
        throw new Error("invalid access code");
      }

      if (isActivationTokenExpired(account.tokenExpiresAt)) {
        throw new Error("Link expired");
      }

      if (account.status !== AccountStatus.PENDING) {
        throw new Error("This account is already activated");
      }

      account.status = AccountStatus.ACTIVE;
      clearActivationToken(account);

      await dataSource.manager.save(account);
      return true;
    } catch (err) {
      console.error("Activation error :", err);
      throw new Error("Failed to activate the account");
    }
  }
}

export class AuthMutation {
  @Mutation(() => String)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
  ): Promise<string> {
    let token = "";

    const account = await dataSource.manager.findOne(Account, {
      where: { email },
    });
    if (!account) {
      throw new Error("Wrong credentials");
    }

    if (account.status !== AccountStatus.ACTIVE) {
      throw new Error("Account is inactive");
    }

    const isValid = await argon2.verify(account.password, password);
    if (!isValid) {
      throw new Error("Wrong credentials");
    }

    if (account.role === "CLIENT") {
      const client = await dataSource.manager.findOne(Client, {
        where: { account: { id: account.id } },
      });

      if (!client) {
        throw new Error("Client not found");
      }
      account.client = client;
      token = generateClientToken(account);
    } else if (account.role === "ADMIN") {
      const companyUser = await dataSource.manager.findOne(CompanyUser, {
        where: { account: { id: account.id } },
      });
      if (!companyUser) {
        throw new Error("Company user not found");
      }
      account.companyUser = companyUser;
      token = generateCompanyUserToken(account);
    }

    return token;
  }
}
