import { Query, Resolver } from "type-graphql";
import { Client } from "../entities/Client";
import { dataSource } from "../dataSource/dataSource";

@Resolver(Client)
export class ClientQueries {
  @Query(() => [Client])
  async getAllClients(): Promise<Client[]> {
    const Clients: Client[] = await dataSource.manager.find(Client);
    return Clients;
  }
}
