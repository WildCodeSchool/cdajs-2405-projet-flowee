import { randomBytes } from "node:crypto";

export function generateActivationToken(timetoexpiration = 24): {
  // time to expiration in hours
  token: string;
  expiresAt: Date;
} {
  const token = randomBytes(32).toString("hex"); // 64 caractères, 256 bits
  const expiresAt = new Date(Date.now() + timetoexpiration * 60 * 60 * 1000); //time to expitation in ms
  return { token, expiresAt };
}

export function isActivationTokenExpired(expiresAt?: Date): boolean {
  if (!expiresAt) return true;
  return expiresAt.getTime() < Date.now();
}

export function clearActivationToken(account: {
  activationToken?: string | null;
  tokenExpiresAt?: Date | null;
}) {
  account.activationToken = null;
  account.tokenExpiresAt = null;
}
