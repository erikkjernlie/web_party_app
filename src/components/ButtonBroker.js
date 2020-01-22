import React from "react";
import TextBroker from "./TextBroker";
import "./index.css";
const ButtonBroker = ({
  children,
  backgroundColor,
  color,
  style,
  onClick,
  loading,
  disabled,
  loadingColor = "white"
}) => {
  if (loading) {
    return <div>Loading</div>;
  }
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default ButtonBroker;
