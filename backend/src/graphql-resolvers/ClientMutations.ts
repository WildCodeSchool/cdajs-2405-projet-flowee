import { dataSource } from "../dataSource/dataSource";
import { Client } from "../entities/Client";
import { Mutation, Arg, Resolver } from "type-graphql";

@Resolver(Client)
export class ClientMutations {
  @Mutation((_) => Client)
  async createClient(
    @Arg("firstName") firstName: string,
    @Arg("lastName") lastName: string
  ): Promise<Client> {
    try {
      const newClient = new Client(firstName, lastName);
      await dataSource.manager.save(newClient);
      return newClient;
    } catch (error) {
      console.info(error);
      throw new Error("Invalid information");
    }
  }
}
