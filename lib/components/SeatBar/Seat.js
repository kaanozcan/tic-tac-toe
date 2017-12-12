import React from "react";
import propTypes from "prop-types";
import Button from "../UI/Button";
import styles from "./index.pcss";

export const Seat = ({
  onRemoveSeatClick,
  showRemoveSeat,
  onClick,
  icon
}) => {
  const removeButton = showRemoveSeat ? (
    <Button type="button" className={styles.seatBar__removeButton} onClick={onRemoveSeatClick}>-</Button>
  ) : null;

  return (
    <li className={styles.seatBar__seat}>
      {removeButton}
      <Button type="button" className={styles.seatBar__button} onClick={onClick}>{icon}</Button>
    </li>
  )
};

Seat.propTypes = {
  onClick: propTypes.func,
  showRemoveSeat: propTypes.bool,
  onRemoveSeatClick: propTypes.func,
  icon: propTypes.element.isRequired
};
