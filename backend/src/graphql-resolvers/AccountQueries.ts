import { Query, Resolver, Arg } from "type-graphql";
import { Account } from "../entities/Account";
import { dataSource } from "../dataSource/dataSource";

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
}
