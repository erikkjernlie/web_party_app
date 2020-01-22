import React, { useContext } from "react";
import "./index.css";
import history from "src/history";
import ButtonBroker from "src/components/ButtonBroker";
import UserContext from "src/context/UserContext";
import JoinPartyScreen from "src/components/JoinPartyScreen";

export default function LandingPageRoute() {
  const { user, loading } = useContext(UserContext);

  return (
    <div>
      <div>Welcome to the cloud based dig twin platform</div>
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
