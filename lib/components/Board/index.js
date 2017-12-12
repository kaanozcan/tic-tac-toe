import React from "react";
import propTypes from "prop-types";
import classnames from "classnames";
import styles from "./index.pcss";

const Board = ({ size, width, height, children }) => {
  const componentClass = classnames({
    [styles.board]: true,
    [styles.board_small]: size === 3,
    [styles.board_medium]: size === 5,
    [styles.board_big]: size === 7,
  });

  return (
    <div className={componentClass}>
      {children}
    </div>
  );
}

export default Board;
export * from "./Space";
