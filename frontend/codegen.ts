import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true, //
  schema: "http://localhost:4000/graphql",
  documents: ["src/graphql*/**/*.{ts,tsx,graphql}"],
  generates: {
    "./src/__generated__/graphql-types.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        withHooks: true,
      },
    },
  },
};

export default config;
