import React from "react";
import { useParams } from "react-router-dom";
import { useGetParty } from "../hooks/joinParty";

import Wheel from "./wheel";

const Party = props => {
  const { id } = useParams();
  const { getting, party } = useGetParty();
  console.log("party", party);
  const items = [
    "Pizzas",
    "Sandwiches",
    "Salads",
    "Soup",
    "Japanese food",
    "Pastas"
  ];

  return (
    <div>
      <h3>ID: {id}</h3>
      <div>party</div>
      {party && (
        <div>
          <p>{party.name}</p>
          <p>{party.startTime}</p>
          <p>{party.endTime}</p>
          <p>{party.date}</p>
          <p>{party.location}</p>
          <Wheel items={party.users} />
        </div>
      )}
    </div>
  );
};

export default Party;
