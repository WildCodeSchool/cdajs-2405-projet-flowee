import { Query, Resolver, Arg } from "type-graphql";
import { Account } from "../entities/Account";
import { dataSource } from "../dataSource/dataSource";

  // ✅ Récupérer tous les Accounts
  @Query(() => [Account])
  async getAllAccounts(): Promise<Account[]> {
    return await dataSource.manager.find(Account);
  }

  // ✅ Récupérer un Account par son ID
  @Query(() => Account, { nullable: true })
  async getAccountById(@Arg("id") id: number): Promise<Account | null> {
    return await dataSource.manager.findOne(Account, { where: { id } });
  }