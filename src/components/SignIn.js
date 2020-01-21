import React, { useState, useContext } from "react";

import TextBroker from "./TextBroker";
import { useSignIn } from "../hooks/auth";
import TextInputBroker from "./TextInputBroker";
import ButtonBroker from "./ButtonBroker";

const SignInScreen = () => {
  const [values, setValues] = useState({
    email: "",
    password: "developer"
  });

  const signIn = useSignIn();

  const handleValues = name => text => {
    setValues({ ...values, [name]: text });
  };
  const handleSubmit = () => {
    if (!signIn.signingIn)
      signIn.withEmailAndPassword(values.email, values.password);
  };

  return (
    <div>
      <View style={styles.container}>
        <TextBroker xxlarge center bold>
          Logg Inn
        </TextBroker>

        <TextInputBroker
          autoFocus
          label="Email"
          value={values.email}
          icon="envelope"
          onChangeText={handleValues("email")}
          placeholder="email"
        />

        <TextInputBroker
          label="Passord"
          value={values.password}
          icon="lock"
          password
          onChangeText={handleValues("password")}
          placeholder="passord"
        />

        {signIn.error && (
          <TextBroker medium color="grey" style={{ marginTop: 10 }}>
            {signIn.error}
          </TextBroker>
        )}

        <ButtonBroker
          onPress={handleSubmit}
          backgroundColor="#1BAC8D"
          color="white"
          loading={signIn.signingIn}
          style={{ marginTop: 15 }}
        >
          Logg Inn
        </ButtonBroker>

        <TouchableOpacity
          style={{ marginTop: 15 }}
          onPress={() => console.log("register")}
        >
          <TextBroker large center>
            Jeg har ikke en bruker?
          </TextBroker>
        </TouchableOpacity>
      </View>
    </div>
  );
};

export default SignInScreen;
