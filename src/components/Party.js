import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetParty } from "../hooks/joinParty";

import Wheel from "./wheel";
import ButtonBroker from "./ButtonBroker";
import history from "../history";

const Party = props => {
  const { id } = useParams();
  const { getting, party } = useGetParty();
  console.log("party", party);
  const [wheel, toggleWheel] = useState(false);

  return (
    <div className="center">
      {party && (
        <div>
          <div>Party:{party.name}</div>
          <div>Start time: {party.startTime}</div>
          <div>End time: {party.endTime}</div>
          <div>Date: {party.date}</div>
          <div>Location: {party.location}</div>
        </div>
      )}
      <div className="flex">
        <ButtonBroker onClick={() => history.push("scoreboard")}>
          See scoreboard
        </ButtonBroker>
        <ButtonBroker onClick={() => history.push("drink")}>
          Add drinks
        </ButtonBroker>
        <ButtonBroker onClick={() => toggleWheel(!wheel)}>
          Spin the wheel
        </ButtonBroker>
      </div>
      {party && wheel && <Wheel items={party.usersDrinkingAlcohol} />}
    </div>
  );
};

export default Party;
