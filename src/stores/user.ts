import { Store } from "@tanstack/store";
import { MeQuery } from "../graphql/codegen/graphql";

export const userStore = new Store({
  user: {} as MeQuery,
});
