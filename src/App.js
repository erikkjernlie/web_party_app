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

export default function App() {
  const [font, setFont] = useState(false);

  const [startTime, newStartTime] = useState(new Date().toString());

  const history = createBrowserHistory({
    basename: ""
  });

  const { user, loading } = useUser();
  const { profile } = useSubscribeProfile(user ? user.email : null);
  console.log("USER", user);
  return (
    <UserProvider value={{ user, profile, history }}>
      <Router history={history}>
        <Navbar loading={loading} user={user} />
        <Switch>
          <Route
            exact
            path="/"
            render={props => <RegisterScreen {...props} />}
          />
          <Route
            exact
            path="/register"
            render={props => <RegisterProfileScreen {...props} />}
          />
          <Route
            exact
            path="/joinparty"
            render={props => <JoinPartyScreen {...props} />}
          />
          <Route
            path="/:id/scoreboard"
            render={props => <ScoreBoard {...props} />}
          />
          <Route
            path="/:id/alc"
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
