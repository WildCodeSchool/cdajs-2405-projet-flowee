import type { Account } from "../entities/Account";

export interface MyContext {
  user: Account | null;
  req: {
    headers: {
      authorization?: string;
    };
  };
}
