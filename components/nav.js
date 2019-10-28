import React, { useState } from "react";
import { signOut, useUser } from "../hooks/auth";
import { LogInWidget } from "./auth";

export const Nav = () => {
  const user = useUser();
  const [displayLogin, changeDisplayLogin] = useState(false);

  const NavLogIn = () => {
    const user = useUser();

    if (user) {
      return (
        <div>
          Logged in as {user.displayName},
          <a href="#" onClick={signOut}>
            Log Out
          </a>
        </div>
      );
    } else {
      return (
        <button
          className="btn btn-primary"
          onClick={() => {
            changeDisplayLogin(!displayLogin);
          }}
        >
          Log In
        </button>
      );
    }
  };

  return (
    <header>
      <nav className="navbar navbar-light bg-light justify-content-between mb-3">
        <div className="container">
          <span className="navbar-brand mb-0 h1">Travel Planner Next</span>
          <div>
            <NavLogIn />
          </div>
        </div>
      </nav>
      {displayLogin && !user ? <LogInWidget /> : ""}
    </header>
  );
};
