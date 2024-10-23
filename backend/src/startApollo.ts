import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const port = 4000;
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Projects {
    title: String

  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
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

		const { url } = await startStandaloneServer(server, {
			listen: { port },
		});

		console.log(`🚀  Server ready at: ${url}`);
	} catch (error) {
		console.error("Error starting server:", error);
	}
}

startServerApollo();
