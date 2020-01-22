import React from "react";
import useAlcoholStore from "../store";
import shallow from "zustand/shallow";
import ButtonBroker from "./ButtonBroker";

const SmallBeer = () => {
  const { smallBeer, increaseSmallBeer, decreaseSmallBeer } = useAlcoholStore(
    state => ({
      smallBeer: state.smallBeer,
      increaseSmallBeer: state.increaseSmallBeer,
      decreaseSmallBeer: state.decreaseSmallBeer
    }),
    shallow
  );
  return (
    <div>
      <div>
        <div>Smallbeer</div>
        <div>{smallBeer}</div>
        <ButtonBroker onClick={increaseSmallBeer}>plus</ButtonBroker>
        <ButtonBroker onClick={decreaseSmallBeer}>minus</ButtonBroker>
      </div>
    </div>
  );
};
export default SmallBeer;
