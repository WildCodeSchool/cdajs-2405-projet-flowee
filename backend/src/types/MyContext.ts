import type { Account } from "../entities/Account";
import type { RedisClientType } from "redis";

export interface MyContext {
  user: Account | null;
  redis: RedisClientType;
}
