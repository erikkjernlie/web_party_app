import React, { useContext } from "react";
import history from "src/history";
import { useSignOut } from "src/hooks/auth";
import ButtonBroker from "./ButtonBroker";

const Navbar = props => {
  const { user, loading, profile } = props;

  const { signOut, signingOut, error } = useSignOut();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className="Navbar">
      <div>My party</div>
      {loading && <div>Loading user</div>}
      {localStorage.getItem("currentParty") && user && (
        <ButtonBroker
          onClick={() => history.replace(localStorage.getItem("currentParty"))}
        >
          Go to party
        </ButtonBroker>
      )}
      {user && !loading && (
        <div className="flex">
          {profile && <div>{profile.userName}</div>}
          <ButtonBroker
            className="black"
            onClick={handleSignOut}
            loading={signingOut}
          >
            Sign out
          </ButtonBroker>
        </div>
      )}
      {!user && !loading && (
        <div>
          <ButtonBroker onClick={() => history.push("/signin")}>
            Sign in
          </ButtonBroker>
        </div>
      )}
    </div>
  );
};

export default Navbar;
