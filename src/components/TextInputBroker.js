import React from "react";
import TextBroker from "./TextBroker";
import "./index.css";
const TextInputBroker = ({
  icon,
  label,
  placeholder,
  style,
  onChange,
  value,
  password,
  type,
  ...rest
}) => {
  return (
    <input
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      value={value}
    />
  );
};
export default TextInputBroker;
