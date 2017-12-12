import React from "react";
import propTypes from "prop-types";
import styles from "./index.pcss";

export const Score = ({
  onClick,
  winningCount,
  token
}) => (
  <li className={styles.scoreBar__score}>
    <span>{token}</span>: <span>{winningCount}</span>
  </li>
);

Score.propTypes = {
  token: propTypes.string,
  winningCount: propTypes.number
};
