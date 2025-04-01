import { dataSource } from "../dataSource/dataSource";
import { Account } from "../entities/Account";
import { Mutation, Arg, Resolver } from "type-graphql";
import type { Role } from "../enums/Role";
import { AccountStatus } from "../enums/AccountStatus";
import argon2 from "argon2";
import { generateToken } from "../middlewares/auth";
@Resolver(Account)
export class AccountMutation {
  @Mutation(() => Account)
  async createAccount(
    @Arg("email") email: string,
    @Arg("password") password: string, // A modifier - stocké en clair temporairement
    @Arg("role") role: Role
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
      console.info("je passe par ici pour creer le compte", hashedPassword);
      // Création du Account
      const newAccount = new Account(
        email,
        hashedPassword,
        role,
        AccountStatus.PENDING
      );

      await dataSource.manager.save(newAccount);
      return newAccount;
    } catch (error) {
      console.error("Error creating account:", error);
      throw new Error("Failed to create account");
    }
  }
}

export class AuthMutation {
  @Mutation(() => String)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<string> {
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

    const token = generateToken(account);
    console.info("token", token);
    return token;
  }
}
