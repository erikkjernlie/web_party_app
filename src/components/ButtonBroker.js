import React from "react";
import TextBroker from "./TextBroker";

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
    <div onClick={onPress}>
      {loading ? (
        <div>Loading</div>
      ) : (
        <TextBroker large color={color} bold>
          {children}
        </TextBroker>
      )}
    </div>
  );
};

export default ButtonBroker;
