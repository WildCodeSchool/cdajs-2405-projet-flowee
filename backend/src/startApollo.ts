import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { dataSource } from "./dataSource/dataSource";

const port = 4000;
const typeDefs = `#graphql

  type Projects {
    title: String

  }

  type Query {
    projects: [Projects]
  }
`;

const projects = [
	{
		title: "Projet1",
	},
	{
		title: "Projet2",
	},
];

const resolvers = {
	Query: {
		projects: () => projects,
	},
};

async function startServerApollo() {
	try {
		const server = new ApolloServer({
			typeDefs,
			resolvers,
		});

		// await dataSource.initialize();

		const { url } = await startStandaloneServer(server, {
			listen: { port },
		});

		console.log(`🚀  Server ready at: ${url}`);
	} catch (error) {
		console.error("Error starting server:", error);
	}
}

startServerApollo();
