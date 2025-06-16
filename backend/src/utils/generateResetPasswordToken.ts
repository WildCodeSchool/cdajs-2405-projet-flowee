import jwt from "jsonwebtoken";
import type { Account } from "../entities/Account";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

interface ResetPasswordTokenPayload {
  accountId: string;
  email: string;
  purpose: "password-reset";
  iat?: number;
  exp?: number;
}

export function generateResetPasswordToken(account: Account): string {
  return jwt.sign(
    {
      accountId: account.id,
      email: account.email,
      purpose: "password-reset",
    },
    JWT_SECRET,
    { expiresIn: "30m" }
  );
}

export function verifyResetPasswordToken(
  token: string
): ResetPasswordTokenPayload {
  const decoded = jwt.verify(token, JWT_SECRET) as ResetPasswordTokenPayload;

  if (decoded.purpose !== "password-reset") {
    throw new Error("Invalid token purpose");
  }

  return decoded;
}
