import { DocumentNode } from "graphql";

const documents: Record<string, DocumentNode> = {};

export function gql(source: string): DocumentNode {
  return documents[source] ?? ({} as DocumentNode);
}
