import React, { useState, useContext } from "react";
import { useRegister, useAbort, useSignIn } from "src/hooks/auth";
import { useCreateProfile } from "src/hooks/profile";
import UserContext from "src/context/UserContext";
import history from "src/history";
import "./index.css";
import ButtonBroker from "src/components/ButtonBroker";
import TextInputBroker from "src/components/TextInputBroker";

export default function SignInUserRoute() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user } = useContext(UserContext); // if user -> redirect to ...

  const { signingIn, withEmailAndPassword, error } = useSignIn();

  const login = () => {
    withEmailAndPassword(email, password);
  };

  return (
    <div>
      <div>
        {user && <div>You are already logged in.</div>}
        <div>Login user here</div>
        <div className="flex">
          <TextInputBroker
            onChange={e => setEmail(e.target.value)}
            value={email}
            placeholder="choose email"
          />
          <TextInputBroker
            onChange={e => setPassword(e.target.value)}
            value={password}
            placeholder="choose password"
            type="password"
          />
          <ButtonBroker onClick={login} loading={signingIn}>
            Login
          </ButtonBroker>
        </div>
      </div>
      <div className="flex">{error && <div>{error}</div>}</div>
      <div className="bottom">
        <div>Do not have a user?</div>
        <div className="flex">
          <ButtonBroker onClick={() => history.push("/register")}>
            Register user here
          </ButtonBroker>
        </div>
      </div>
    </div>
  );
}
