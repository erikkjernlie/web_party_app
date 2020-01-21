import React, { useState, useContext } from "react";

import TextBroker from "./TextBroker";
import { useRegister, useSignOut } from "../hooks/auth";
import TextInputBroker from "./TextInputBroker";
import ButtonBroker from "./ButtonBroker";
import UserContext from "../context/UserContext";

const RegisterScreen = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = useRegister(props.history);

  const handleSubmit = () => {
    if (!register.registering) register.withEmailAndPassword(email, password);
  };

  const { signOut, signingOut, error } = useSignOut();

  return (
    <div>
      <div>
        <TextBroker xxlarge bold center>
          Registrere
        </TextBroker>

        <TextInputBroker
          autoFocus
          label="Email"
          value={email}
          icon="envelope"
          onChangeText={e => setEmail(e.target.value)}
          placeholder="email"
        />
        <TextInputBroker
          label="Passord"
          value={password}
          icon="lock"
          password
          onChangeText={e => setPassword(e.target.value)}
          placeholder="passord"
        />
        {register.error && (
          <TextBroker medium color="grey" style={{ marginTop: 10 }}>
            {register.error}
          </TextBroker>
        )}
        <ButtonBroker
          onPress={handleSubmit}
          backgroundColor="#1BAC8D"
          color="white"
          loading={register.registering}
        >
          Neste
        </ButtonBroker>
        <ButtonBroker
          onPress={signOut}
          backgroundColor="#1BAC8D"
          color="white"
          loading={signingOut}
        >
          Sign out
        </ButtonBroker>
        <div onClick={() => console.log("navigate to ...")}>
          <TextBroker large center>
            Har du allerede en bruker?
          </TextBroker>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
