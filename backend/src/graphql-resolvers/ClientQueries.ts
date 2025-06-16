import { Arg, Query, Resolver } from "type-graphql";
import { dataSource } from "../dataSource/dataSource";
import { Client } from "../entities/Client";

@Resolver(Client)
export class ClientQueries {
  @Query(() => [Client])
  async getAllClients(): Promise<Client[]> {
    const Clients: Client[] = await dataSource.manager.find(Client);
    return Clients;
  }

  @Query(() => Client, { nullable: true })
  async getClientById(@Arg("id") id: number): Promise<Client | null> {
    const client: Client | null = await dataSource.manager.findOne(Client, {
      where: { id },
    });
    return client;
  }
}
