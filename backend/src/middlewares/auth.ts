import jwt from "jsonwebtoken";
import { Account } from "../entities/Account";
import { AccountStatus } from "../enums/AccountStatus";
import { dataSource } from "../dataSource/dataSource";
import type { AuthChecker } from "type-graphql";
import type { MyContext } from "../types/MyContext";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";

export function generateToken(account: Account): string {
  return jwt.sign(
    { accountId: account.id, email: account.email, role: account.role },
    JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
}

export function generateClientToken(account: Account): string {
  if (!account.client) {
    throw new Error("Client data is missing from the account.");
  }

  const { id: accountId, email, role } = account;
  const { id: clientId, clientName } = account.client;

  return jwt.sign(
    {
      accountId,
      clientId,
      email,
      role,
      clientName,
    },
    JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
}

export function generateCompanyUserToken(account: Account): string {
  if (!account.companyUser) {
    throw new Error("Company User data is missing from the account.");
  }

  const { id: accountId, email, role } = account;
  const { id: companyUserId, firstname, lastname } = account.companyUser;

  return jwt.sign(
    {
      accountId,
      companyUserId,
      email,
      role,
      firstname,
      lastname,
    },
    JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
}

export async function getAccount(token: string): Promise<Account | null> {
  try {
    if (!token || token.trim() === "") {
      return null;
    }

    const cleanToken = token.replace(/^Bearer\s/, "");

    const payload = jwt.verify(cleanToken, JWT_SECRET) as { accountId: number };

    const account = await dataSource.manager.findOne(Account, {
      where: { id: payload.accountId },
      relations: ["compagnyUser", "companyUser.company"],
    });

    if (!account) return null;

    if (account.status !== AccountStatus.ACTIVE) {
      return null;
    }

    return account;
  } catch (error) {
    console.error("Erreur de récupération du compte :", error);
    return null;
  }
}

export const authChecker: AuthChecker<MyContext> = (
  { context: { user } },
  roles
) => {
  // Check user
  if (!user) {
    // No user, restrict access
    return false;
  }

  // Check '@Authorized()'
  if (roles.length === 0) {
    // Only authentication required
    return true;
  }

  // Check '@Authorized(...)' roles overlap
  return roles.includes(user.role as string); // @Authorized() attend une string mais notre user.role est une enum donc comparé à une string => on le convertit en string
};

