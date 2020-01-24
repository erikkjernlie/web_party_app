import React, { useContext, useEffect } from "react";
import "./index.css";
import history from "src/history";
import ButtonBroker from "src/components/ButtonBroker";
import UserContext from "src/context/UserContext";
import JoinPartyScreen from "src/components/JoinPartyScreen";
import ConfettiCanvas from "react-confetti-canvas";
import * as confetti from "canvas-confetti";

export default function LandingPageRoute() {
  const { user, loading } = useContext(UserContext);

  return (
    <div>
      <div className="confetti">
        <ConfettiCanvas />
      </div>
      <div>Welcome to the party</div>
      <div className="button">
        <ButtonBroker
          onClick={() => {
            confetti.create()({
              shapes: ["square"],
              particleCount: 100,
              spread: 90,
              x: 1,
              y: 1
            });
          }}
        >
          PARTY
        </ButtonBroker>
      </div>

      {loading && <div>Loading</div>}
      {!user && !loading && (
        <div className="flex">
          <ButtonBroker onClick={() => history.push("/register")}>
            Register
          </ButtonBroker>
          <ButtonBroker onClick={() => history.push("/signin")}>
            Login
          </ButtonBroker>
        </div>
      )}
      {user && !loading && <JoinPartyScreen />}
    </div>
  );
}
