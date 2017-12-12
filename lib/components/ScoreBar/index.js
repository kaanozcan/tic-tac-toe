import React from "react";
import styles from "./index.pcss";
import classnames from "classnames";

const ScoreBar = ({
  children
}) => {
  const componentClass = classnames({
    [styles.scoreBar]: true,
    [styles.scoreBar_wide]: children.length > 2
  });

  return (
    <ul className={componentClass}>
      {children}
    </ul>
  )
}

export default ScoreBar;
export * from "./Score";
