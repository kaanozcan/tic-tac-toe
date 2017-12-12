import { graphiqlExpress } from 'apollo-server-express';
import config from "config";

const PORT = config.get("server.port"),
      HOST = config.get("server.host");

const isNodeEnvDev = process.env.NODE_ENV === "development";

const subscriptionsEndpoint = isNodeEnvDev ? `ws://localhost:${PORT}/subscriptions` : `ws://${HOST}/subscriptions`;

export default graphiqlExpress({
  endpointURL: '/graphql',
  subscriptionsEndpoint
});
