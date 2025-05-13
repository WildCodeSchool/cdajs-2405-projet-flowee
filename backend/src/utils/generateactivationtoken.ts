import jwt from "jsonwebtoken";
import type { Account } from "../entities/Account";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

interface ActivationTokenPayload {
  accountId: string;
  email: string;
  clientName?: string;
  purpose: "activation";
  iat?: number;
  exp?: number;
}

export function generateActivationJWT(
  account: Account,
  clientName?: string,
): string {
  return jwt.sign(
    {
      accountId: account.id,
      email: account.email,
      clientName,
      purpose: "activation",
    },
    JWT_SECRET,
    { expiresIn: "15m" },
  );
}

export function verifyActivationJWT(token: string): ActivationTokenPayload {
  const decoded = jwt.verify(token, JWT_SECRET) as ActivationTokenPayload;

  if (decoded.purpose !== "activation") {
    throw new Error("Invalid token purpose");
  }

  return decoded;
}
