import React, { PropTypes } from 'react'
import classnames from "classnames";
import styles from "./index.pcss";

const Button = ({
  children,
  className,
  selected,
  ...props }) => {
  const buttonClass = classnames({
    [styles.button]: true,
    [styles.isSelected]: selected,
    [className]: typeof className === "string"
  });

  return (
    <button className={buttonClass} {...props}>{children}</button>
  )
}

export default Button;
