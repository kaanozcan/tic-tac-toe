import path from "path";
import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import { createServer } from "http";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { execute, subscribe } from "graphql";

import config from "config";
import graphql from "./middlewares/graphql";
import graphiql from "./middlewares/graphiql";
import site from "./middlewares/site";
import schema from "./schema";

import validateConfiguration from "./utils/validateConfiguration";

const server = express();

const nodeEnv = process.env.NODE_ENV;
const isNodeEnvDev = nodeEnv === "development";
const isNodeEnvProduction = nodeEnv === "production";

const PORT = parseInt(config.get("server.port"));
const HOST = config.get("server.host");
const SESSION_SECRET = config.get("server.session.secret");

server.use(session({
  secret: SESSION_SECRET,
  cookie: {}
}));

server.use(bodyParser.json());
server.use("/public", express.static(path.join(process.cwd(), "public")));
server.use("/graphql", graphql);
server.use("/graphiql", graphiql);
server.use("*",site);

const ws = createServer(server);

ws.listen(PORT, () => {
  new SubscriptionServer({
    execute,
    subscribe,
    schema
  }, {
    server: ws,
    path: '/subscriptions',
  });

  console.log(`Graphql Server on port ${PORT}`);
});
