import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { cleanDB, dataSource, initTestData } from "./dataSource/dataSource";
import { ProjectQueries } from "./graphql-resolvers/ProjectQueries";
7;
import { buildSchema } from "type-graphql";

const port = 4000;

async function startServerApollo() {
	try {
		const schema = await buildSchema({
			resolvers: [ProjectQueries],
		});
		const server = new ApolloServer({
			schema,
		});

		await dataSource.initialize();
		// cleanDB();
		// initTestData();

		const { url } = await startStandaloneServer(server, {
			listen: { port },
		});

		console.log(`🚀  Server ready at: ${url}`);
	} catch (error) {
		console.error("Error starting server:", error);
	}
}

startServerApollo();
