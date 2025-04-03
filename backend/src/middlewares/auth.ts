import jwt from "jsonwebtoken";
import { Account } from "../entities/Account";
import { AccountStatus } from "../enums/AccountStatus";
import { dataSource } from "../dataSource/dataSource";
import { AuthChecker } from "type-graphql";
import { MyContext } from "../types/MyContext";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-key";

export function generateToken(account: Account): string {
  return jwt.sign({ accountId: account.id }, JWT_SECRET, {
    expiresIn: "7d",
  });
}

export async function getAccount(token: string): Promise<Account | null> {
  try {
    if (!token || token.trim() === "") {
      return null;
    }

    const cleanToken = token.replace(/^Bearer\s/, "");
    console.info("token dans getAccount", cleanToken);

    const payload = jwt.verify(cleanToken, JWT_SECRET) as { accountId: number };
    console.info("accountId", payload.accountId);

    const account = await dataSource.manager.findOne(Account, {
      where: { id: payload.accountId },
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
  roles,
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
