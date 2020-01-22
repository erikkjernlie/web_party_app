import { storeData, getData } from "../services/StorageService";
import { useState, useEffect } from "react";
import { firestore } from "../config/firebase";
import useAlcoholStore from "../store";
import shallow from "zustand/shallow";

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
        storeData("drinkingHours", new Date());
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

export const useScoreBoard = () => {
  const [getting, setGetting] = useState(false);
  const [error, setError] = useState(null);
  const [scoreBoard, setScoreBoard] = useState(null);
  const [promille, setPromille] = useState(null);
  const [names, setNames] = useState(null);

  const get = async () => {
    setGetting(true);
    let partyName = getData("currentParty");
    try {
      let data = {};
      let party = await firestore
        .collection("parties")
        .doc(partyName)
        .collection("drinkers")
        .get()
        .then(querySnapshot => {
          let n = [];
          let p = [];
          querySnapshot.forEach(doc => {
            data[doc.id] = doc.data().promille;
            n.push(doc.id);
            p.push(Number(doc.data().promille).toFixed(2));
          });
          setPromille(p);
          setNames(n);
        });
    } catch (error) {
      console.log("does not exists");
    } finally {
      setGetting(false);
    }
  };

  useEffect(() => {
    get();
  }, []);

  return {
    scoreBoard,
    getting,
    promille,
    names,
    error
  };
};

export const save = (
  userName,
  promille,
  smallBeer,
  largeBeer,
  wine,
  spirits
) => {
  try {
    firestore
      .collection("parties")
      .doc(localStorage.getItem("currentParty"))
      .collection("drinkers")
      .doc(userName)
      .set({
        smallBeer,
        largeBeer,
        spirits,
        wine,
        promille
      })
      .then(() => {
        console.log("done");
      });
  } catch (error) {
    console.log("does not exists");
  }
};
