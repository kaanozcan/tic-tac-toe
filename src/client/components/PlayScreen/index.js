import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import filter from "graphql-anywhere";
import ApolloDisplay from "../ApolloDisplay";

import LoadingIndicator from "../LoadingIndicator";
import Board, { Space } from "lib/components/Board";
import ScoreBar, { Score } from "lib/components/ScoreBar";
import { WAITING, PLAYING, RESTARTING } from "lib/constants/gameStatus";
import styles from "./index.pcss"

const infoMessages = {
  [WAITING]: "Waiting for other players.",
  [RESTARTING]: "Soon will restart.",
  [PLAYING]: "Game in progress."
}

class PlayScreen extends Component {

  constructor (props) {
    super(props);
  }

  componentDidMount () {
    const { roomId } = this.props;

    this.props.join(roomId);
    this.props.subscribeToGameProgress({roomId});
  }

  doMove = (x, y) => () => {
    const { roomId } = this.props;

    this.props.play(roomId, x, y);
  };

  selectToken = (roomId, token) => () => this.props.selectToken(roomId, token);

  render () {
    const {
      room: {
        id,
        status,
        board: {
          size,
          spaces
        },
        seats
      }
    } = this.props.data;

    const spaceElements = [].concat(...spaces).map(({ x, y, token }, i) => (
      <Space key={i} token={token} onClick={this.doMove(x, y, token)} />
    ));

    const availableTokenElements = seats.map(({ token, isWinner, winningCount }, i) => (
      <Score key={i} token={token}  isWinner={isWinner} winningCount={winningCount} />
    ));

    return (
      <div>
        <Board size={size}>
          {spaceElements}
        </Board>
        <ScoreBar>
          {availableTokenElements}
        </ScoreBar>
        <div className={styles.playScreen__info}>
          <span>{infoMessages[status]}</span>
        </div>
      </div>
    );
  }
}

const roomFragment = gql`
  fragment RoomFragment on Room {
    id
    status
    board {
      size
      spaces {
        x
        y
        token
      }
    }
    seats {
      isAI
      isWinner
      winningCount
      token
    }
  }
`;

const subscriptionQuery = gql`
  subscription ($roomId: Int){
    gameProgressed(roomId: $roomId) {
      ...RoomFragment
    }
  }
  ${roomFragment}
`;

const QueryData = graphql(gql`
  query ($roomId: Int) {
    room(id: $roomId) {
      ...RoomFragment
    }
  }
  ${roomFragment}
`, {
    props: props => ({
      data: props.data,
      subscribeToGameProgress: params => props.data.subscribeToMore({
        document: subscriptionQuery,
        variables: {
          roomId: params.roomId
        },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) {
              return prev;
          }

          const gameData = subscriptionData.data.gameProgressed;

          return Object.assign({}, prev, { room: gameData });
        }
      })
    })
});

const JoinMutation = graphql(gql`
  mutation ($roomId: Int) {
    join(roomId: $roomId) {
      id
    }
  }
`, {
  props: props => ({
    join: (roomId) => props.mutate({ variables: { roomId } })
  })
});

const PlayMutation = graphql(gql`
  mutation ($roomId: Int, $x: Int, $y: Int) {
    play(roomId: $roomId, x: $x, y:$y) {
      id
    }
  }
`, {
  props: props => ({
    play: (roomId, x, y) => props.mutate({ variables: { roomId, x, y } })
  })
});

const PlayScreenWithData = compose(QueryData, JoinMutation, PlayMutation)(props => (
  <ApolloDisplay {...props} loadingComponent={LoadingIndicator} component={PlayScreen} />
));

export default PlayScreenWithData;
