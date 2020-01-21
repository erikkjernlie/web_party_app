import React from "react";

const Navbar = props => {
  const { loading, user } = props;
  return (
    <div>
      <div>navbar</div>
      {loading && <div> loading user</div>}
      {user && !loading && <div>user logged in</div>}
      {!user && !loading && <div>user not logged in</div>}
    </div>
  );
};
export default Navbar;
