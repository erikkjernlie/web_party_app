import { useState, useEffect } from "react";
import { firestore } from "src/config/firebase";
import history from "src/history";
//import { errorFromErrorCode } from '@/services/ErrorService';

//TODO: Use errorFromErrorCode to get norwegian errors
export const useSubscribeProfile = email => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  let unsub;
  const subscribe = async email => {
    try {
      unsub = await firestore
        .collection("profiles")
        .doc(email)
        .onSnapshot(doc => {
          setProfile(doc.data());
        });
    } catch (error) {
      console.log(error);
      setError(error.toString());
    }
  };

  useEffect(() => {
    if (email) subscribe(email);
    return () => {
      if (unsub) unsub();
      setProfile(null);
    };
  }, [email]);

  return { profile, error };
};

//TODO: Use errorFromErrorCode to get norwegian errors
export const useGetProfile = user => {
  const [profile, setProfile] = useState(null);
  const [getting, setGetting] = useState(false);
  const [error, setError] = useState(null);

  const get = async () => {
    setGetting(true);
    try {
      // might need to take this outside if to get loading etc.
      if (user && user.email) {
        let profile = await firestore
          .collection("profiles")
          .doc(user.email)
          .get();
        setProfile(profile.data());
      }
    } catch (error) {
      console.log(error);
      setError(error.toString());
    } finally {
      setGetting(false);
    }
  };

  useEffect(() => {
    get();
  }, []);

  return { getting, profile, error };
};

//TODO: Use errorFromErrorCode to get norwegian errors
export const useCreateProfile = () => {
  const [createProfileError, setError] = useState(null);
  const [creating, setCreating] = useState(false);

  const create = async profile => {
    setCreating(true);
    const { email, ...profileInfo } = profile;

    try {
      await firestore
        .collection("profiles")
        .doc(email)
        .set(profileInfo);
      setCreating(false);
      history.push("/");
    } catch (error) {
      console.log(error);
      setError(error.toString());
      setCreating(false);
    }
  };

  return { create, creating, createProfileError };
};

//TODO: Use errorFromErrorCode to get norwegian errors
export const useUpdateProfile = () => {
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);

  const update = async profile => {
    setUpdating(true);
    const { email, ...profileInfo } = profile;
    try {
      await firestore
        .collection("profiles")
        .doc(email)
        .update(profileInfo);
    } catch (error) {
      console.log(error);
      setError(error.toString());
    } finally {
      setUpdating(false);
    }
  };

  return { update, updating, error };
};
