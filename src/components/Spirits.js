import React from "react";
import useAlcoholStore from "../store";
import shallow from "zustand/shallow";
import ButtonBroker from "./ButtonBroker";

const Spirits = () => {
  const { spirits, increaseSpirits, decreaseSpirits } = useAlcoholStore(
    state => ({
      spirits: state.spirits,
      increaseSpirits: state.increaseSpirits,
      decreaseSpirits: state.decreaseSpirits
    }),
    shallow
  );
  return (
    <div>
      <div>
        <div>spirits</div>
        <div>{spirits}</div>
        <ButtonBroker onClick={increaseSpirits}>plus</ButtonBroker>
        <ButtonBroker onClick={decreaseSpirits}>minus</ButtonBroker>
      </div>
    </div>
  );
};
export default Spirits;
