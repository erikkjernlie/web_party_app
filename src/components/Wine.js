import React from "react";
import useAlcoholStore from "../store";
import shallow from "zustand/shallow";
import ButtonBroker from "./ButtonBroker";

const Wine = () => {
  const { wine, increaseWine, decreaseWine } = useAlcoholStore(
    state => ({
      wine: state.wine,
      increaseWine: state.increaseWine,
      decreaseWine: state.decreaseWine
    }),
    shallow
  );
  return (
    <div>
      <div>
        <div>Wine</div>
        <div>{wine}</div>
        <ButtonBroker onClick={increaseWine}>plus</ButtonBroker>
        <ButtonBroker onClick={decreaseWine}>minus</ButtonBroker>
      </div>
    </div>
  );
};
export default Wine;
