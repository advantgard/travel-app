import React, { useState } from "react";
import { signOut, useUser } from "../hooks/auth";
import { LogInWidget } from "./auth";

export const Nav = () => {
  const user = useUser();
  const [displayLogin, changeDisplayLogin] = useState(false);

  const LogInText = ({ displayName, signOutFn }) => (
    <div>
      Logged in as {displayName},&nbsp;
      <a href="#" onClick={signOutFn}>
        Log Out
      </a>
    </div>
  );

  const LogInButton = ({ onClick }) => (
    <button className="btn btn-primary" onClick={onClick}>
      Log In
    </button>
  );

  return (
    <header>
      <nav className="navbar navbar-light bg-light justify-content-between mb-3">
        <div className="container">
          <span className="navbar-brand mb-0 h1">Travel Planner Next</span>
          <div>
            {user ? (
              <LogInText displayName={user.displayName} signOutFn={signOut} />
            ) : (
              <LogInButton
                onClick={() => {
                  changeDisplayLogin(!displayLogin);
                }}
              />
            )}
          </div>
        </div>
      </nav>
      {displayLogin && !user ? <LogInWidget /> : ""}
    </header>
  );
};
