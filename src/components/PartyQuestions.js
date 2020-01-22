import React, { useEffect, useState } from "react";
import TextInputBroker from "./TextInputBroker";
import ButtonBroker from "./ButtonBroker";
import { useJoiningParty } from "../hooks/joinParty";
import { Card, CardWrapper } from "react-swipeable-cards";
import history from "../history";

const PartyQuestions = () => {
  const [partyName, setPartyName] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("white");
  const { joinParty, joiningParty, error } = useJoiningParty();

  const data = ["Alexandre", "Thomas", "Lucien"];

  const handleSubmit = () => {
    if (partyName.length > 0) {
      joinParty(partyName);
    }
  };
  const getEndCard = () => {
    return (
      <div>
        <ButtonBroker
          backgroundColor="#1BAC8D"
          color="white"
          onClick={() => history.push(localStorage.getItem("currentParty"))}
        >
          Join party
        </ButtonBroker>
      </div>
    );
  };

  const onSwipeLeft = () => {
    console.log("left");
  };

  const onSwipeRight = () => {
    console.log("right");
  };

  const onDoubleTap = () => {
    if (backgroundColor === "#024773") {
      setBackgroundColor("white");
    } else {
      setBackgroundColor("#024773");
    }
  };

  const cardStyle = {
    backgroundColor: backgroundColor
  };
  const wrapperStyle = {
    backgroundColor: "#024773"
  };

  return (
    <div>
      <div>
        <CardWrapper addEndCard={() => getEndCard()} style={wrapperStyle}>
          <Card
            style={cardStyle}
            onSwipeLeft={() => onSwipeLeft()}
            onSwipeRight={() => onSwipeRight()}
            onDoubleTap={() => onDoubleTap()}
          >
            Do you want to drink alcohol during the party?
          </Card>
          <Card
            onSwipeLeft={() => onSwipeLeft()}
            onSwipeRight={() => onSwipeRight()}
            onDoubleTap={() => onDoubleTap()}
          >
            Do you want to attend the scoreboard for drinking a lot?
          </Card>
        </CardWrapper>
      </div>
    </div>
  );
};

export default PartyQuestions;
