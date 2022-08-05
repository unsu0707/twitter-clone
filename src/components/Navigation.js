import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({ userObj }) => {
  return (
    <nav>
      <ul>
        <Link to="/">Home</Link>
        <Link to="/profile">{userObj.displayName} Profile</Link>
      </ul>
    </nav>
  );
};

export default Navigation;
