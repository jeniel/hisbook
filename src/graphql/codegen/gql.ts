import { DocumentNode } from "graphql";

// remove unused import: types

// Explicit type for documents
const documents: DocumentNode[] = [];

export function gql(source: string): DocumentNode {
  return documents[source] ?? ({} as DocumentNode);
}