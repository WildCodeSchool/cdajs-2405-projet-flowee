import { dataSource } from "../dataSource/dataSource";
import { Account } from "../entities/Account";
import { Client } from "../entities/Client";
import { Mutation, Arg, Resolver } from "type-graphql";

@Resolver(Client)
export class ClientMutations {
  @Mutation((_) => Client)
  async createClient(
    @Arg("Name") name: string,
    @Arg("accountId") accountId: number,
  ): Promise<Client> {
    try {
      //On verifié si account existe
      const account = await dataSource.manager.findOne(Account, {
        where: { id: accountId },
      });
      if (!account) {
        throw new Error("Account not found");
      }
      const existingclient = await dataSource.manager.findOne(Client, {
        where: { name: name },
      });
      if (existingclient) {
        throw new Error("Le client existe deja ");
      }
      const newClient = new Client(name, account);
      await dataSource.manager.save(newClient);
      return newClient;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create client");
    }
  }
}
