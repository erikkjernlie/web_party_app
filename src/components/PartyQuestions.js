import React, { useEffect, useState, useContext } from "react";
import TextInputBroker from "./TextInputBroker";
import ButtonBroker from "./ButtonBroker";
import { useJoiningParty, joinPartyAfterQuestions } from "../hooks/joinParty";
import { Card, CardWrapper } from "react-swipeable-cards";
import history from "../history";
import UserContext from "../context/UserContext";

const PartyQuestions = () => {
  const [backgroundColor, setBackgroundColor] = useState("white");
  const { joinParty, joiningParty, error } = useJoiningParty();

  const [drinking, setDrinking] = useState(false);
  const [attendingScoreBoard, setAttendingScoreBoard] = useState(false);

  const { user, profile } = useContext(UserContext);

  const getEndCard = () => {
    return (
      <div>
        <ButtonBroker
          backgroundColor="#1BAC8D"
          color="white"
          onClick={() =>
            joinPartyAfterQuestions(
              profile.userName,
              user.email,
              drinking,
              attendingScoreBoard
            )
          }
        >
          Join party
        </ButtonBroker>
      </div>
    );
  };

  const onSwipeLeft = () => {
    console.log("left");
  };

  const onSwipeDrinking = () => {
    setDrinking(true);
  };

  const onSwipeAttending = () => {
    setAttendingScoreBoard(true);
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
      PS: JA er mot høyre, NEI mot venstre
      <div>
        <CardWrapper addEndCard={() => getEndCard()} style={wrapperStyle}>
          <Card
            style={cardStyle}
            onSwipeLeft={() => onSwipeLeft()}
            onSwipeRight={() => onSwipeDrinking()}
            onDoubleTap={() => onDoubleTap()}
          >
            Do you want to drink alcohol during the party?
          </Card>
          <Card
            onSwipeLeft={() => onSwipeLeft()}
            onSwipeRight={() => onSwipeAttending()}
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
