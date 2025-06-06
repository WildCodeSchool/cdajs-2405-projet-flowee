import type { RedisClientType } from "redis";
import type { Account } from "../entities/Account";

export const invalidateCache = async (
  redis: RedisClientType,
  user: Account,
) => {
  const cacheKey = `user-projects:${user.role}:${user.id}`;
  try {
    await redis.del(cacheKey);
    console.info(`Cache invalidated for key: ${cacheKey}`);
  } catch (error) {
    console.error(`Error invalidating cache for key ${cacheKey}:`, error);
  }
};
