import React from "react";
import TextBroker from "./TextBroker";
import "./index.css";
const ButtonBroker = ({
  children,
  backgroundColor,
  color,
  style,
  onPress,
  loading,
  loadingColor = "white"
}) => {
  return (
    <button onClick={onPress}>
      {loading ? (
        <div>Loading</div>
      ) : (
        <TextBroker large color={color} bold>
          {children}
        </TextBroker>
      )}
    </button>
  );
};

export default ButtonBroker;
