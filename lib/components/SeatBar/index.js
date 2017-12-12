import React from "react";
import propTypes from "prop-types";
import { Seat } from "./Seat";

import styles from "./index.pcss";

const SeatBar = ({
  onAddSeatClick,
  maxSeats,
  children
}) => {
  const showAddSeat = children.length < maxSeats;
  const addSeatButton = showAddSeat ? (
    <Seat onClick={onAddSeatClick} icon={<span>+</span>} />
  ) : null;

  return (
    <ul className={styles.seatBar}>
      {children}
      {addSeatButton}
    </ul>
  )
}

SeatBar.propTypes = {
  maxSeats: propTypes.number.isRequired,
  onAddSeatClick: propTypes.func.isRequired
}

export default SeatBar;
export * from "./Seat";
