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
      <div>Digital Twin Cloud Platform</div>
      {loading && <div>Loading user</div>}
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
