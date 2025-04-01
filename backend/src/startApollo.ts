import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { dataSource } from "./dataSource/dataSource";
import { ProjectQueries } from "./graphql-resolvers/ProjectQueries";
import { buildSchema } from "type-graphql";
import { registerEnumType } from "type-graphql";
import { Role } from "./enums/Role";
import { ProjectStatus } from "./enums/ProjectStatus";
import { AccountStatus } from "./enums/AccountStatus";
import { ProjectMutations } from "./graphql-resolvers/ProjectMutations";
import { CompagnyQueries } from "./graphql-resolvers/CompagnyQueries";
import { CompagnyMutations } from "./graphql-resolvers/CompagnyMutations";
import { TaskQueries } from "./graphql-resolvers/TaskQueries";
import { TaskMutations } from "./graphql-resolvers/TaskMutations";
import { DeliverableQueries } from "./graphql-resolvers/DeliverableQueries";
import { DeliverableMutations } from "./graphql-resolvers/DeliverableMutations";
import { ClientQueries } from "./graphql-resolvers/ClientQueries";
import { ClientMutations } from "./graphql-resolvers/ClientMutations";
import {
  AccountMutation,
  AuthMutation,
} from "./graphql-resolvers/AccountMutation";
import { AccountQueries } from "./graphql-resolvers/AccountQueries";
import { MyContext } from "./types/MyContext";
// import { initTestData } from "./scripts/initTestData";
import { Project } from "./entities/Project";
import { getAccount } from "./middlewares/auth";

registerEnumType(Role, {
  name: "Role",
  description: "Roles available for a user (admin or client) ",
});

registerEnumType(ProjectStatus, {
  name: "ProjectStatus",
  description: "Project, task or deliverable status",
});

registerEnumType(AccountStatus, {
  name: "AccountStatus",
  description: "Account status",
});

export async function cleanDB() {
  await dataSource.manager.clear(Project);
}

const port = 4000;

async function startServerApollo() {
  try {
    const schema = await buildSchema({
      resolvers: [
        ProjectQueries,
        ProjectMutations,
        CompagnyQueries,
        CompagnyMutations,
        TaskQueries,
        TaskMutations,
        DeliverableQueries,
        DeliverableMutations,
        ClientQueries,
        ClientMutations,
        CompagnyMutations,
        AccountMutation,
        AccountQueries,
        AuthMutation,
      ],
    });
    const server = new ApolloServer<MyContext>({ schema });

    await dataSource.initialize();
    console.info("Data Source has been initialized!");
    // cleanDB();
    // initTestData();

    const { url } = await startStandaloneServer<MyContext>(server, {
      context: async ({ req }) => {
        // Get the user token from the headers.
        const token = req.headers.authorization || "";

        // Try to retrieve a user with the token
        const user = await getAccount(token);

        // // Add the user to the context
        return { user };
      },
      listen: { port, host: "0.0.0.0" },
    });

    console.info(`🚀  Server ready at: ${url}`);
  } catch (error) {
    console.error("Error starting server:", error);
  }
}

startServerApollo();
