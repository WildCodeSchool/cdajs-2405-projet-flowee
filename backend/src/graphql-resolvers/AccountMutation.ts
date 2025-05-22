import argon2 from "argon2";
import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { dataSource } from "../dataSource/dataSource";
import { Account } from "../entities/Account";
import { Client } from "../entities/Client";
import { CompanyUser } from "../entities/CompanyUser";
import { AccountStatus } from "../enums/AccountStatus";
import type { Role } from "../enums/Role";
import {
  generateClientToken,
  generateCompanyUserToken,
} from "../middlewares/auth";
import { sendPasswordChangeNotification } from "../services/sendActivationEmail";
import type { MyContext } from "../types/MyContext";
import {
  clearActivationToken,
  isActivationTokenExpired,
} from "../utils/accesstoken";
import {
  generateActivationJWT,
  verifyActivationJWT,
} from "../utils/generateactivationtoken";
import { validatePasswordChange } from "../utils/passwordUtils";

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

  @Mutation(() => String)
  async activateAccountAndReturnToken(
    @Arg("token") token: string,
  ): Promise<string> {
    const account = await dataSource.manager.findOne(Account, {
      where: { activationToken: token },
      relations: ["client"],
    });

    if (!account) throw new GraphQLError("Token invalide.");
    if (isActivationTokenExpired(account.tokenExpiresAt))
      throw new GraphQLError("Lien expiré.");
    if (account.status !== AccountStatus.PENDING)
      throw new GraphQLError("Compte déjà activé.");

    const jwtToken = generateActivationJWT(account, account.client?.clientName);
    return jwtToken;
  }

  @Mutation(() => Boolean)
  async setPasswordFromActivation(
    @Arg("token") token: string,
    @Arg("password") password: string,
  ): Promise<boolean> {
    const { accountId } = verifyActivationJWT(token);

    const account = await dataSource.manager.findOne(Account, {
      where: { id: Number.parseInt(accountId) },
    });

    if (!account || account.status !== AccountStatus.PENDING) {
      throw new GraphQLError("Enable to activate the account.");
    }

    account.password = await argon2.hash(password);
    account.status = AccountStatus.ACTIVE;
    clearActivationToken(account);

    await dataSource.manager.save(account);
    return true;
  }

  @Mutation(() => Boolean)
  async updatePassword(
    @Arg("currentPassword") currentPassword: string,
    @Arg("newPassword") newPassword: string,
    @Ctx() context: MyContext,
  ): Promise<boolean> {
    try {
      // Check if user is authenticated
      if (!context.user) {
        throw new GraphQLError("Not authenticated");
      }

      // Extract token from Authorization header
      const authHeader = context.req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new GraphQLError("Not authorized");
      }

      const token = authHeader.split(" ")[1];

      if (!process.env.JWT_SECRET) {
        throw new GraphQLError(
          "Configuration error: JWT_SECRET is not defined",
        );
      }

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
          accountId: number;
        };

        // Check if user is modifying their own account
        if (decoded.accountId !== context.user.id) {
          throw new GraphQLError("Not authorized to modify this account");
        }

        // Get account
        const account = await dataSource.manager.findOne(Account, {
          where: { id: decoded.accountId },
        });

        if (!account) {
          throw new GraphQLError("Account not found");
        }

        // Verify current password
        const isValid = await argon2.verify(account.password, currentPassword);
        if (!isValid) {
          throw new GraphQLError("Current password is incorrect");
        }

        // Validate new password
        const validationResult = validatePasswordChange(
          currentPassword,
          newPassword,
        );

        if (!validationResult.isValid) {
          throw new GraphQLError(validationResult.errors.join(", "));
        }

        // Hash and save new password
        account.password = await argon2.hash(newPassword);
        await dataSource.manager.save(account);

        // Send notification email
        try {
          const userName =
            account.client?.clientName ||
            account.companyUser?.firstname ||
            account.email;
          await sendPasswordChangeNotification(account.email, userName);
        } catch (emailError) {
          // Don't block the process if email fails
        }

        return true;
      } catch (jwtError) {
        throw new GraphQLError("Invalid token");
      }
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new GraphQLError("Invalid token");
      }
      if (error instanceof GraphQLError) {
        throw error;
      }
      throw new GraphQLError("Error updating password");
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
