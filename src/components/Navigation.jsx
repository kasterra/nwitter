import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({ userName }) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="profile">{`${userName}'s Profile`}</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
