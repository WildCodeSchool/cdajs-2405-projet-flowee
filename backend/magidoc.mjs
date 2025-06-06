// magidoc.mjs

export default {
  introspection: {
    type: "url",
    url: "http://localhost:4000/graphql",
  },
  website: {
    template: "carbon-multi-page",
    options: {
      appTitle: "Documentation Flowee",
      queryGenerationFactories: {
        DateTimeISO: "2025-06-3T10:00:00.000Z",
      },
      appLogo: "https://example.com/logo.png",
      pages: [
        {
          title: "Bienvenue",
          content: `
# Documentation Flowee

Bienvenue sur la documentation de l'API GraphQL de Flowee.
          `,
        },
      ],
    },
  },
};
