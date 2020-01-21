import React from "react";
import TextBroker from "./TextBroker";

const TextInputBroker = ({
  icon,
  label,
  placeholder,
  style,
  onChangeText,
  value,
  password,
  keyboardType,
  ...rest
}) => {
  return (
    <div>
      <TextBroker>{label}</TextBroker>
      <div>
        <div>ICON</div>
        <input
          onChange={onChangeText}
          value={value}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};
export default TextInputBroker;
