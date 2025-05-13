import { randomBytes } from "node:crypto";

/**
 * Génère un token sécurisé (hexadécimal) et sa date d'expiration
 * @param ttlInHours Nombre d'heures avant expiration (par défaut 24)
 */
export function generateToken(ttlInHours = 24): {
  token: string;
  expiresAt: Date;
} {
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + ttlInHours * 60 * 60 * 1000); // TTL en ms
  return { token, expiresAt };
}

/**
 * Vérifie si un token est expiré
 * @param expiresAt Date d'expiration
 */
export function isTokenExpired(expiresAt?: Date): boolean {
  if (!expiresAt) return true;
  return expiresAt.getTime() < Date.now();
}
