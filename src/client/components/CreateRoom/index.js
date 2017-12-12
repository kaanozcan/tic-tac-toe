import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import filter from "graphql-anywhere";
import ApolloDisplay from "../ApolloDisplay";
import LoadingIndicator from "../LoadingIndicator";

import styles from "./index.pcss";
import SeatBar, { Seat } from "lib/components/SeatBar";

const defaultState = {
  roomId: null,
  seats: [{
    isAI: false
  }, {
    isAI: false
  }]
};

class CreateRoom extends Component {
  constructor (props)  {
    super(props);
    this.state = defaultState;
  }

  onSeatClick = (index) => () => this.setState(({seats}) => {
    seats[index].isAI = !seats[index].isAI;

    return {
      seats
    };
  });

  onAddSeatClick = () => this.setState(({ seats }) => ({
    seats: [...seats, { isAI: false}]
  }));

  onRemoveSeatClick = (index) => () => this.setState(({ seats }) => {
    seats.splice(index, 1);

    return {
      seats
    }
  });

  renderSeats = () => {
    const { seats } = this.state;
    const showRemoveSeat = seats.length > 2;

    return seats.map(({ isAI }, i) => { 
      const icon = isAI ? <span>AI</span> : <span>PERSON</span>;

      return (
        <Seat key={i}
              icon={icon}
              showRemoveSeat={showRemoveSeat}
              onRemoveSeatClick={this.onRemoveSeatClick(i)} />
      );
    });
  };

  submit = () => this.props.submit(this.state.seats)
    .then(({ data: { createRoom, error }}) => this.setState({ roomId: createRoom.id }));

  render () {
    const seats = this.renderSeats();

    if (typeof this.state.roomId === "number") {
      return (
        <Redirect to={`/play/${this.state.roomId}`}/>
      )
    }

    return (
      <div>
        <SeatBar maxSeats={3} onAddSeatClick={this.onAddSeatClick}>
          {seats}
        </SeatBar>
        <button type="button" className={styles["create-room__submit"]} onClick={this.submit}>Create</button>
      </div>
    );
  }
}

const query = gql`
  mutation ($seats: [SeatInput]) {
    createRoom (seats: $seats) {
      id
    }
  }
`;

const CreateRoomWithMutation = graphql(query, {
  props: ({ mutate }) => ({
    submit: (seats) => mutate({ variables: { seats } }),
  }),
})(CreateRoom);

export default CreateRoomWithMutation;
