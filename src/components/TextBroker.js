import React from "react";

const TextBroker = ({
  children,
  small,
  medium,
  bold,
  large,
  xlarge,
  xxlarge,
  style,
  color,
  center,
  ...rest
}) => {
  const fontSize = () => {
    if (medium) {
      return 13;
    } else if (large) {
      return 15;
    } else if (xlarge) {
      return 18;
    } else if (xxlarge) {
      return 20;
    }
    return 10;
  };

  return <div>{children}</div>;
};

export default TextBroker;
