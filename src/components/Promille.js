import React, { useContext } from "react";
import useAlcoholStore from "../store";
import { useGetProfile } from "../hooks/profile";
import UserContext from "../context/UserContext";
import shallow from "zustand/shallow";
import ButtonBroker from "./ButtonBroker";
import { save } from "../hooks/joinParty";

const Promille = () => {
  const { largeBeer, smallBeer, wine, spirits } = useAlcoholStore(
    state => ({
      largeBeer: state.largeBeer,
      smallBeer: state.smallBeer,
      wine: state.wine,
      spirits: state.spirits
    }),
    shallow
  );

  const saveToScoreBoard = () => {
    if (promille > 0) {
      save(profile.userName, promille, smallBeer, largeBeer, wine, spirits);
    }
  };

  const { user, profile } = useContext(UserContext);

  const drinkingHours = localStorage.getItem("drinkingHours");
  const numbersOfHoursSinceDrinking = Math.abs(
    (new Date() - new Date(drinkingHours)) / 36e5
  );

  const largeBeerGram = largeBeer * 18;
  const smallBeerGram = smallBeer * 12.5;
  const wineGram = wine * 11.5;
  const spiritsGram = spirits * 13;
  const totalGram = largeBeerGram + smallBeerGram + wineGram + spiritsGram;
  const promille =
    profile && profile.gender
      ? profile.gender === "male"
        ? totalGram / (profile.weight * 0.7) -
          0.15 * numbersOfHoursSinceDrinking
        : totalGram / (profile.weight * 0.6) -
          0.15 * numbersOfHoursSinceDrinking
      : 0;

  return (
    <div>
      {user && profile && (
        <div>
          <div>Promille:</div>
          <div>{promille > 0 ? promille : 0}</div>
        </div>
      )}
      <ButtonBroker onClick={() => saveToScoreBoard()}>
        Save to scoreboard
      </ButtonBroker>
    </div>
  );
};
export default Promille;
