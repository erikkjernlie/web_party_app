import React, { useState, useContext, useEffect } from "react";

import { useAbort } from "../hooks/auth";
import userContext from "../context/UserContext";
import TextBroker from "./TextBroker";
import TextInputBroker from "./TextInputBroker";
import ButtonBroker from "./ButtonBroker";
import { startProfileRegistration } from "../services/RegisterService";
import { useCreateProfile } from "../hooks/profile";

const RegisterProfileScreen = props => {
  const [userName, setUserName] = useState("hehe");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("male");

  const [formError, setFormError] = useState(null);
  const { create, creating, error: createUserError } = useCreateProfile(
    props.history
  );
  const { abort, aborting } = useAbort();
  const { user } = useContext(userContext);

  useEffect(() => {
    startProfileRegistration();
  }, []);

  const formIsValidated = () => {
    if (userName.trim() === "") {
      setFormError("Du må fylle inn et brukernavn");
      return false;
    }

    if (weight.trim() === "") {
      setFormError("Du må fylle inn en vekt (eller skrive 0)");
      return false;
    }
    if (isNaN(weight)) {
      setFormError("Vekt må bare være tall");
      return false;
    }
    if (gender === "") {
      setFormError("Du må velge kjønn");
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!creating && formIsValidated())
      create({ userName, weight, gender, email: user.email });
  };

  const handleAbort = () => {
    abort(user);
  };

  return (
    <div>
      <div>
        <TextBroker xxlarge bold center>
          Profile
        </TextBroker>

        <TextInputBroker
          autoFocus
          label="Brukernavn"
          icon="user"
          onChangeText={e => setUserName(e.target.value)}
          value={userName}
          placeholder="Brukernavn"
        />

        <TextInputBroker
          label="Vekt i kg (for å beregne promille)"
          icon="diamond"
          onChangeText={e => setWeight(e.target.value)}
          value={weight}
          placeholder="Ønsker du ikke beregne dette, sett 0"
          keyboardType="numeric"
        />
        {/*SELECT HERE*/}

        {formError && (
          <TextBroker medium color="grey">
            {formError}
          </TextBroker>
        )}
        {createUserError && (
          <TextBroker medium color="grey">
            {createUserError}
          </TextBroker>
        )}

        <ButtonBroker
          backgroundColor="#1BAC8D"
          color="white"
          onClick={handleSubmit}
          loading={creating}
        >
          Ferdig
        </ButtonBroker>

        <ButtonBroker
          onClick={handleAbort}
          loading={aborting}
          color="grey"
          loadingColor="grey"
        >
          Avbryt
        </ButtonBroker>
      </div>
    </div>
  );
};

export default RegisterProfileScreen;
