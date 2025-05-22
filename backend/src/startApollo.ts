import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import { registerEnumType } from "type-graphql";
import { dataSource } from "./dataSource/dataSource";
// import { initTestData } from "./scripts/initTestData";
import { Project } from "./entities/Project";
import { AccountStatus } from "./enums/AccountStatus";
import { ClientStatus } from "./enums/ClientStatus";
import { ProjectStatus } from "./enums/ProjectStatus";
import { Role } from "./enums/Role";
import {
  AccountMutation,
  AuthMutation,
} from "./graphql-resolvers/AccountMutation";
import { AccountQueries } from "./graphql-resolvers/AccountQueries";
import { ClientMutations } from "./graphql-resolvers/ClientMutations";
import { ClientQueries } from "./graphql-resolvers/ClientQueries";
import { CompagnyMutations } from "./graphql-resolvers/CompagnyMutations";
import { CompagnyQueries } from "./graphql-resolvers/CompagnyQueries";
import { DeliverableMutations } from "./graphql-resolvers/DeliverableMutations";
import { DeliverableQueries } from "./graphql-resolvers/DeliverableQueries";
import { ProjectMutations } from "./graphql-resolvers/ProjectMutations";
import { ProjectQueries } from "./graphql-resolvers/ProjectQueries";
import { TaskMutations } from "./graphql-resolvers/TaskMutations";
import { TaskQueries } from "./graphql-resolvers/TaskQueries";
import { TrackerStatsQueries } from "./graphql-resolvers/TrackerStatsQueries";
import { authChecker, getAccount } from "./middlewares/auth";
import { createRateLimiterPlugin } from "./plugins/simpleRateLimiterPlugin";
import type { MyContext } from "./types/MyContext";
import {
  createComplexityRule,
  createMaxDepthRule,
  createNoIntrospectionRule,
} from './utils/securityRules';

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

registerEnumType(ClientStatus, {
  name: "ClientStatus",
  description: "Status of client",
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
        TrackerStatsQueries,
      ],
      authChecker,
    });
    const server = new ApolloServer<MyContext>({ 
      schema, // Allows introspection outside of the prod
      introspection: process.env.NODE_ENV !== 'production', 
      validationRules: [
        createMaxDepthRule(10),              // max depth = 10
        createComplexityRule({               // max complexity = 500
        scalarCost: 1,
        objectCost: 2,
        listFactor: 10,
        maxCost: 500,
    }),
    // Disable introspection in prod
    ...(process.env.NODE_ENV === 'production'
      ? [createNoIntrospectionRule()]
      : []),
  ],
  // we put our rate-limiter in-memory
  plugins: [
    createRateLimiterPlugin({
      windowMs: 60_000, // 1 minute
      max: 100,         // 100 requests per minute
    }),
  ],
});

    await dataSource.initialize();
    console.info("Data Source has been initialized!");
    // cleanDB();
    // initTestData();

    const { url } = await startStandaloneServer<MyContext>(server, {
      context: async ({ req }) => {
        // Get the user token from the headers.
        const token = req.headers.authorization || "";
        console.info("token dans la connexion BDD", token);

        // Try to retrieve a user with the token
        const user = await getAccount(token);

        // Add the user to the context
        return { user, req };
      },
      listen: { port, host: "0.0.0.0" },
    });

    console.info(`🚀  Server ready at: ${url}`);
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1); // Quit on a critical error
  }
}

startServerApollo();
