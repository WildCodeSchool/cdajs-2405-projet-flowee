import { Arg, Mutation, Resolver } from "type-graphql";
import { dataSource } from "../dataSource/dataSource";
import { Account } from "../entities/Account";
import { Client } from "../entities/Client";
import { ClientStatus} from "../enums/ClientStatus";

@Resolver(Client)
export class ClientMutations {
  @Mutation(() => Client)
  async createClient(
    @Arg("Name") name: string,
    @Arg("accountId") accountId: number,
  ): Promise<Client> {
    try {
      const account = await dataSource.manager.findOne(Account, {
        where: { id: accountId },
      });
      if (!account) {
        throw new Error("Account not found");
      }
      const existingClient = await dataSource.manager.findOne(Client, {
        where: { clientName: name },
      });
      if (existingClient) {
        throw new Error("Client already exists");
      }
      const newClient = new Client(name, account);
      await dataSource.manager.save(newClient);
      return newClient;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create client");
    }
  }

  @Mutation(() => Client)
  async updateClient(
    @Arg("id", () => Number) id: number,
    @Arg("newName", { nullable: true }) newName: string,
    @Arg("newEmail", { nullable: true }) newEmail: string,
    @Arg("newStatus", { nullable: true }) newStatus: ClientStatus,
  ): Promise<Client> {
    if (!newName && !newEmail && !newStatus) {
      throw new Error("No fields to update");
    }
    const client = await dataSource.manager.findOne(Client, {
      where: { id },
    });
    if (!client) {
      throw new Error("client not found");
    }

     if (newName !== undefined) {
      client.clientName = newName;
    }
    if (newEmail) {
       if (!client.account) {
      throw new Error("Account not found for the client");
    }
      client.account.email = newEmail;
      await dataSource.manager.save(client.account);
    }
    if (newStatus !== undefined) {
      client.status = newStatus;
    }
    await dataSource.manager.save(client);
    return client;
    }


  @Mutation(() => Boolean)
  async deleteClient(
    @Arg("id", () => Number) id: number,
  ): Promise<boolean> {
    try {
      const result = await dataSource.manager.delete(Client, { id });
      return result.affected !== 0;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to delete client");
    }
  }

  @Mutation(() => Client)
  async archiveClient(
    @Arg("id", () => Number) id: number,
  ): Promise<Client> {
    try {
      const client = await dataSource.manager.findOne(Client, {
        where: { id },
      });
      if (!client) {
        throw new Error("Client not found");
      }
      client.status = ClientStatus.ARCHIVED;
      await dataSource.manager.save(client);
      return client;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to archive client");
    }
  }
}