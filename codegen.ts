import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:3001/graphql",
  documents: ["src/**/*.tsx"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "src/graphql/codegen/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
