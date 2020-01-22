import React, { useEffect, useState } from "react";
import { useUser } from "./hooks/auth";
import { UserProvider } from "./context/UserContext";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

import { useSubscribeProfile } from "./hooks/profile";
import RegisterScreen from "./components/Register";
import RegisterProfileScreen from "./components/RegisterProfile";
import JoinPartyScreen from "./components/JoinPartyScreen";
import Party from "./components/Party";
import Navbar from "./components/Navbar";
import Beer from "./components/SmallBeer";
import Wine from "./components/Wine";
import Spirits from "./components/Spirits";
import Promille from "./components/Promille";
import SmallBeer from "./components/SmallBeer";
import LargeBeer from "./components/LargeBeer";
import ScoreBoard from "./components/ScoreBoard";
import RegisterUserRoute from "./Routes/UserRoute/RegisterUserRoute";
import SignInUserRoute from "./Routes/UserRoute/SignInUserRoute";
import LandingPageRoute from "./Routes/LandingPageRoute/LandingPageRoute";
import history from "./history";
import PartyQuestions from "./components/PartyQuestions";
export default function App() {
  const [font, setFont] = useState(false);

  const [startTime, newStartTime] = useState(new Date().toString());

  const { user, loading } = useUser();
  const { profile } = useSubscribeProfile(user ? user.email : null);
  console.log("USER", user);
  return (
    <UserProvider value={{ user, profile, loading }}>
      <Router history={history}>
        <Navbar loading={loading} user={user} profile={profile} />
        <Switch>
          <Route
            exact
            path="/"
            render={props => <LandingPageRoute {...props} />}
          />
          <Route
            exact
            path="/register"
            render={props => <RegisterUserRoute {...props} />}
          />
          <Route
            exact
            path="/signin"
            render={props => <SignInUserRoute {...props} />}
          />
          <Route
            exact
            path="/party-questions"
            render={props => <PartyQuestions {...props} />}
          />
          <Route
            exact
            path="/joinparty"
            render={props => <JoinPartyScreen {...props} />}
          />
          <Route
            path="/scoreboard"
            render={props => <ScoreBoard {...props} />}
          />
          <Route
            path="/drink"
            render={props => (
              <div>
                <SmallBeer {...props} />
                <div style={{ marginTop: "40px" }}></div>
                <LargeBeer {...props} />
                <div style={{ marginTop: "40px" }}></div>
                <Wine {...props} />
                <div style={{ marginTop: "40px" }}></div>
                <Spirits {...props} />
                <div style={{ marginTop: "40px" }}></div>
                <Promille {...props} />
              </div>
            )}
          />

          <Route path="/:id" render={props => <Party {...props} />} />
        </Switch>
      </Router>
    </UserProvider>
  );
}
