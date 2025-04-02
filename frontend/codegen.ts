import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true, //
  schema: "http://localhost:4000",
  documents: ["src/graphql-queries/*.ts"],
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
