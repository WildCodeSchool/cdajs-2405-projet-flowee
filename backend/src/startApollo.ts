import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { dataSource } from "./dataSource/dataSource";
import { ProjectQueries } from "./graphql-resolvers/ProjectQueries";

import { buildSchema } from "type-graphql";
import { ProjectMutations } from "./graphql-resolvers/ProjectMutations";
import { CompagnyQueries } from "./graphql-resolvers/CompagnyQueries";
import { CompagnyMutations } from "./graphql-resolvers/CompagnyMutations";
import { TaskQueries } from "./graphql-resolvers/TaskQueries";
import { TaskMutations } from "./graphql-resolvers/TaskMutations";
import { DeliverableQueries } from "./graphql-resolvers/DeliverableQueries";
import { DeliverableMutations } from "./graphql-resolvers/DeliverableMutations";
import { ClientQueries } from "./graphql-resolvers/ClientQueries";

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
        CompagnyMutations,
      ],
    });
    const server = new ApolloServer({
      schema,
    });

    await dataSource.initialize();
    console.log("Data Source has been initialized!");
    //cleanDB();
    //initTestData();

    const { url } = await startStandaloneServer(server, {
      listen: { port },
    });

    console.log(`🚀  Server ready at: ${url}`);
  } catch (error) {
    console.error("Error starting server:", error);
  }
}

startServerApollo();
