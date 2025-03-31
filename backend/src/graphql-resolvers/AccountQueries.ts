import { Query, Resolver, Arg, Ctx } from "type-graphql";
import { Account } from "../entities/Account";
import { dataSource } from "../dataSource/dataSource";
import type { MyContext } from "../types/MyContext";

@Resolver(Account)
export class AccountQueries {
  @Query(() => [Account])
  async getAllAccounts(): Promise<Account[]> {
    const Accounts: Account[] = await dataSource.manager.find(Account);
    return Accounts;
  }

  @Query(() => Account, { nullable: true })
  async getAccountById(@Arg("id") id: number): Promise<Account | null> {
    const account: Account | null = await dataSource.manager.findOne(Account, {
      where: { id },
    });
    return account;
  }

  @Query(() => Account, { nullable: true })
  me(@Ctx() context: MyContext): Account | null {
    return context.user;
  }
}
