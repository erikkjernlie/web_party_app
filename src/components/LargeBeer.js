import React from "react";
import useAlcoholStore from "../store";
import shallow from "zustand/shallow";
import ButtonBroker from "./ButtonBroker";

const LargeBeer = () => {
  const { largeBeer, increaseLargeBeer, decreaseLargeBeer } = useAlcoholStore(
    state => ({
      largeBeer: state.largeBeer,
      increaseLargeBeer: state.increaseLargeBeer,
      decreaseLargeBeer: state.decreaseLargeBeer
    }),
    shallow
  );
  return (
    <div className="alc">
      <div>Largebeer</div>
      <div>{largeBeer}</div>
      <ButtonBroker onClick={increaseLargeBeer}>plus</ButtonBroker>
      <ButtonBroker onClick={decreaseLargeBeer}>minus</ButtonBroker>
    </div>
  );
};
export default LargeBeer;
