import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <ul>
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
      </ul>
    </nav>
  );
};

export default Navigation;
