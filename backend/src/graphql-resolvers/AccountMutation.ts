import { dataSource } from "../dataSource/dataSource";
import { Account } from "../entities/Account";
import { Mutation, Arg, Resolver } from "type-graphql";
import type { Role } from "../enums/Role";
@Resolver(Account)
export class AccountMutation {
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

      // Création de l'Account
      const newAccount = new Account(email, password, role);

      await dataSource.manager.save(newAccount);
      return newAccount;
    } catch (error) {
      console.error("Error creating account:", error);
      throw new Error("Failed to create account");
    }
  }
}
