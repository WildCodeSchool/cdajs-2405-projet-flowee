import type { RedisClientType } from "redis";
import type { Account } from "../entities/Account";

export interface MyContext {
  user: Account | null;
  redis: RedisClientType;
}
