import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import CreateRoom from "../CreateRoom";
import PlayScreen from "../PlayScreen";
import NotFound from "../NotFound";
import styles from "./index.pcss";

class App extends Component {
  render () {
    return (
      <div className={styles["main-container"]}>
        <header className={styles.header}>
          Tic Tac Toe | <Link to="/">Create New Room</Link>
        </header>

        <Switch>
          <Route path="/play/:roomId" render={props => {
            const roomId = parseInt(props.match.params.roomId);
            return <PlayScreen {...props} roomId={roomId} />
          }} />
          <Route path="/" exact component={CreateRoom} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
