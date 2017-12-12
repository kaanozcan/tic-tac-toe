import React, { Component } from "react";
import { split } from "apollo-link";
import { ApolloClient } from "apollo-client";
import { getMainDefinition } from "apollo-utilities";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter, Route } from "react-router-dom";
import App from "../App";

import "./index.pcss";

const wsLink = new WebSocketLink({
  uri: `ws://${location.host}/subscriptions`,
  options: {
    reconnect: true
  }
});
const httpLink = new HttpLink({
  uri: "/graphql",
  credentials: "same-origin",
  fetch: window.fetch
});
const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

class Root extends Component {
  render () {
    return (
      <ApolloProvider client={apolloClient}>
        <BrowserRouter>
          <Route match="/" component={App} />
        </BrowserRouter>
      </ApolloProvider>
    )
  }
}

export default Root;
