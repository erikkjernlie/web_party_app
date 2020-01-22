import React, { useEffect, useState } from "react";
import TextInputBroker from "./TextInputBroker";
import ButtonBroker from "./ButtonBroker";
import { useJoiningParty } from "../hooks/joinParty";
import { Card, CardWrapper } from "react-swipeable-cards";

const JoinPartyScreen = () => {
  const [partyName, setPartyName] = useState("");
  const { joinParty, joiningParty, error } = useJoiningParty();

  const handleSubmit = () => {
    if (partyName.length > 0) {
      joinParty(partyName);
    }
  };

  return (
    <div>
      <div>join party JoinPartyScreen</div>
      <TextInputBroker
        label="join party"
        icon="diamond"
        onChange={e => setPartyName(e.target.value)}
        value={partyName}
        placeholder="skriv inn party"
      />

      <ButtonBroker
        backgroundColor="#1BAC8D"
        color="white"
        onClick={handleSubmit}
        loading={joiningParty}
      >
        Join party
      </ButtonBroker>
      {error && <div>{error}</div>}
    </div>
  );
};

export default JoinPartyScreen;
