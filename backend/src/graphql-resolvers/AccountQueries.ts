import { Query, Resolver, Arg, Ctx } from "type-graphql";
import { Account } from "../entities/Account";
import { dataSource } from "../dataSource/dataSource";
import type { MyContext } from "../types/MyContext";
import { getFullAccountFromContext } from "../middlewares/auth";

@Resolver(Account)
export class AccountQueries {
  @Query(() => [Account])
  async getAllAccounts(): Promise<Account[]> {
    const Accounts: Account[] = await dataSource.manager.find(Account);
    return Accounts;
  }

  @Query(() => Account, { nullable: true })
  async getAccountById(@Arg("id") id: string): Promise<Account | null> {
    const account: Account | null = await dataSource.manager.findOne(Account, {
      where: { id },
    });
    return account;
  }

  @Query(() => Account, { nullable: true })
  async me(@Ctx() context: MyContext): Promise<Account | null> {
    return await getFullAccountFromContext(context);
  }
}
