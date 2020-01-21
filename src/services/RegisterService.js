import { getData, storeData } from "./StorageService";

export const isProfileRegistrationStarted = () => {
  const isStarted = getData("profile-registration");
  return isStarted == null ? false : isStarted;
};

export const startProfileRegistration = () => {
  storeData("profile-registration", "true");
};

export const endProfileRegistration = () => {
  storeData("profile-registration", "false");
};
