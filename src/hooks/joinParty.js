import { storeData, getData } from "../services/StorageService";
import { useState, useEffect } from "react";
import { firestore } from "../config/firebase";

export const useJoiningParty = () => {
  const [joiningParty, setJoiningParty] = useState(false);
  const [error, setError] = useState(null);

  const joinParty = async partyName => {
    setJoiningParty(true);

    console.log("partyname", partyName);

    try {
      let party = await firestore
        .collection("parties")
        .doc(partyName)
        .get();
      if (party.exists) {
        storeData("currentParty", partyName);
        window.location.href = `${window.location.origin}/${partyName}`;
      } else {
        setError("do not exists");
      }
    } catch (error) {
      console.log("does not exists");
    } finally {
      setJoiningParty(false);
    }
  };

  return {
    joinParty,
    joiningParty,
    error
  };
};

export const useGetParty = () => {
  const [party, setParty] = useState(null);
  const [getting, setGetting] = useState(false);
  const [error, setError] = useState(null);

  const get = async () => {
    setGetting(true);
    try {
      // might need to take this outside if to get loading etc.
      let d = getData("currentParty");
      let p = await firestore
        .collection("parties")
        .doc(d)
        .get();
      setParty(p.data());
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

  return { getting, party, error };
};
