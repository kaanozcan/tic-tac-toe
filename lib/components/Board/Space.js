import React from "react";
import propTypes from "prop-types";
import Button from "../UI/Button";
import styles from "./index.pcss";

export const Space = ({ onClick, token}) => {
  return (
    <Button type="button" className={styles.board__space} onClick={onClick}>{token}</Button>
  )
};

Space.propTypes = {
  onClick: propTypes.func,
  token: propTypes.string
};
