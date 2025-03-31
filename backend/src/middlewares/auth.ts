import jwt from "jsonwebtoken";
import { Account } from "../entities/Account";
import { AccountStatus } from "../enums/AccountStatus";
import { dataSource } from "../dataSource/dataSource";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-key";

export function generateToken(account: Account): string {
  return jwt.sign({ accountId: account.id }, JWT_SECRET, {
    expiresIn: "7d",
  });
}

export async function getAccount(token: string): Promise<Account | null> {
  try {
    if (!token) {
      return null;
    }

    // const cleanToken = token.replace(/^Bearer\s/, "");

    const payload = jwt.verify(token, JWT_SECRET) as { accountId: number };

    const account = await dataSource.manager.findOne(Account, {
      where: { id: payload.accountId },
    });

    if (!account) return null;

    if (account.status !== AccountStatus.ACTIVE) {
      return null;
    }
    console.info("recup account", account);

    return account;
  } catch (error) {
    console.error("Erreur de récupération du compte :", error);
    return null;
  }
}
