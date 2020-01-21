const norwegianErrors = {
  "auth/email-already-in-use":
    "Denne email adressen blir allerede brukt av en annen konto",
  "auth/invalid-email": "Denne email adressen er dårlig formatert",
  "auth/weak-password": "Passordet må bestå av minst 6 tegn",
  "auth/user-disabled": "Denne brukeren er deaktivert",
  "auth/user-not-found": "Det finnes ingen bruker med denne mail adressen",
  "auth/wrong-password": "Feil passord"
};

export const errorFromErrorCode = errorCode => {
  return norwegianErrors[errorCode];
};
