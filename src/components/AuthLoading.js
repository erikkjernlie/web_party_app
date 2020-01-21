import React, { useEffect, useContext } from "react";
import UserContext from "@/context/UserContext";
import { isProfileRegistrationStarted } from "../services/RegisterService";

const AuthLoadingScreen = ({ navigation: { navigate } }) => {
  const { user } = useContext(UserContext);

  const redirect = async () => {
    if (user !== undefined) {
      profileIsStarted = await isProfileRegistrationStarted();
      if (user && profileIsStarted == "true") {
        navigate("RegisterProfile");
      } else {
        navigate(user ? "App" : "Auth");
      }
    }
  };

  useEffect(() => {
    redirect();
  }, [user]);

  return <div>hello</div>;
};

export default AuthLoadingScreen;
