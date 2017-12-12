import * as Query from "./Query";
import * as Mutation from "./Mutation";
import * as Subscription from "./Subscription";

const rootSchema = `
  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
`;

export default [
  rootSchema,
  ...Object.keys(Query).map(key => Query[key]),
  ...Object.keys(Mutation).map(key => Mutation[key]),
  ...Object.keys(Subscription).map(key => Subscription[key])
];
