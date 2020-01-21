import { useState, useEffect, useContext } from "react";
import firebase, { firestore } from "../config/firebase";
import { endProfileRegistration } from "../services/RegisterService";
import { errorFromErrorCode } from "../services/ErrorService";
import UserContext from "../context/UserContext";

export const useRegister = history => {
  const [registering, setRegistering] = useState(false);
  const [error, setError] = useState(null);

  // const { history } = useContext(UserContext);

  const withEmailAndPassword = async (email, password) => {
    setRegistering(true);
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      // navigate
      window.location.href = `${window.location.origin}/register`;
    } catch (error) {
      console.log(error);
      setError(errorFromErrorCode(error.code));
      setRegistering(false);
    }
  };

  return {
    registering,
    error,
    withEmailAndPassword
  };
};

export const useSignIn = () => {
  const [signingIn, setSigningIn] = useState(false);
  const [error, setError] = useState(null);

  const withEmailAndPassword = async (email, password) => {
    setSigningIn(true);
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      // navigate
    } catch (error) {
      setError(errorFromErrorCode(error.code));
      setSigningIn(false);
    }
  };

  return {
    signingIn,
    error,
    withEmailAndPassword
  };
};

//TODO: Use errorFromErrorCode to get norwegian errors
export const useSignOut = () => {
  const [signingOut, setSigningOut] = useState(false);
  const [error, setError] = useState(null);

  const signOut = async () => {
    setSigningOut(true);
    try {
      await firebase.auth().signOut();
      // navigate
    } catch (error) {
      setError(error);
      setSigningOut(false);
    }
  };

  return {
    signOut,
    signingOut,
    error
  };
};

export const useUser = () => {
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const subscribeToAuthState = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    subscribeToAuthState();
  }, []);

  return { user, loading };
};

//TODO: Create independent and generic delete functions.
//TODO: Use errorFromErrorCode to get norwegian errors
export const useAbort = () => {
  const [error, setError] = useState(null);
  const [aborting, setAborting] = useState(false);

  const abort = async user => {
    if (user.email) {
      setAborting(true);
      try {
        console.log("DELETING USER PROFILE CONNECTED TO: ", user.email);
        await firestore
          .collection("profiles")
          .doc(user.email)
          .delete();
      } catch (error) {
        console.log(error);
        setError(error.toString());
        throw error;
      } finally {
        try {
          console.log("DELETING USER: ", user.email);
          await user.delete();
          await endProfileRegistration();
          setAborting(false);
          // navigate user
        } catch (error) {
          console.log(error);
          setError(error.toString());
          throw error;
        }
      }
    }
  };

  return { abort, aborting, error };
};
