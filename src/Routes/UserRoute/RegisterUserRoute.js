import React, { useState, useContext, useEffect } from "react";
import { useRegister, useAbort } from "src/hooks/auth";
import { useCreateProfile } from "src/hooks/profile";
import UserContext from "src/context/UserContext";
import history from "src/history";
import "./index.css";
import ButtonBroker from "src/components/ButtonBroker";
import TextInputBroker from "src/components/TextInputBroker";

export default function RegisterUserRoute() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [weight, setWeight] = useState(0);
  const [gender, setGender] = useState("female");

  const { user } = useContext(UserContext);

  const {
    error,
    successfulRegister,
    withEmailAndPassword,
    registering
  } = useRegister();

  const { create, createProfileError, creating } = useCreateProfile();

  const { abort, aborting, abortError } = useAbort();

  const handleRegisterSubmit = () => {
    if (!registering) {
      withEmailAndPassword(email, password);
    }
  };

  const handleProfileSubmit = () => {
    create({
      email: email,
      userName,
      weight,
      gender
    });
  };

  const handleAbort = () => {
    abort(user);
  };

  return (
    <div className="flex">
      {!successfulRegister && (
        <div>
          <div>Register user here</div>
          <div className="flex">
            <TextInputBroker
              onChange={e => setEmail(e.target.value)}
              value={email}
              placeholder="Your e-mail"
            />
            <TextInputBroker
              onChange={e => setPassword(e.target.value)}
              value={password}
              placeholder="Your password"
              type="password"
            />
            {!successfulRegister && (
              <ButtonBroker
                onClick={handleRegisterSubmit}
                loading={registering}
              >
                Register user
              </ButtonBroker>
            )}
          </div>
          {error && <div className="flex">{error}</div>}
        </div>
      )}

      {successfulRegister && (
        <div>
          <div>Register profile here</div>
          <TextInputBroker
            onChange={e => setUserName(e.target.value)}
            value={userName}
            placeholder="Choose user name"
          />
          <TextInputBroker
            onChange={e => setWeight(e.target.value)}
            value={weight}
            type="number"
            placeholder="weight"
          />
          <div className="flex">
            <div>Selected gender: {gender}</div>
            <ButtonBroker
              onClick={() => setGender("male")}
              disabled={gender === "female" ? null : "asd"}
            >
              Male
            </ButtonBroker>
            <ButtonBroker
              onClick={() => setGender("female")}
              disabled={gender === "female" ? "asd" : null}
            >
              Female
            </ButtonBroker>
          </div>

          <div className="flex">
            <ButtonBroker onClick={handleProfileSubmit} loading={creating}>
              Save user profile
            </ButtonBroker>
            {createProfileError && <div>{createProfileError}</div>}
            <ButtonBroker onClick={handleAbort} loading={aborting}>
              Cancel
            </ButtonBroker>
          </div>
          {abortError && <div>{abortError}</div>}
        </div>
      )}
      <div className="bottom">
        <div>Already have a user?</div>
        <div className="flex">
          <ButtonBroker onClick={() => history.push("/signin")}>
            Sign in user here
          </ButtonBroker>
        </div>
      </div>
    </div>
  );
}
