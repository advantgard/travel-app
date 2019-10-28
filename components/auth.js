import React from "react";
import { signIn } from "../hooks/auth";
import {
  FacebookLoginButton,
  InstagramLoginButton,
  GoogleLoginButton
} from "react-social-login-buttons";

export const LogInWidget = () => (
  <div className="container">
    <div className="row">
      <div className="col-md-6" />
      <div className="col-md-6">
        <div className="login--social">
          <p>Other login methods</p>
          <FacebookLoginButton onClick={() => {}} />
          <InstagramLoginButton onClick={() => {}} />
          <GoogleLoginButton onClick={signIn.bind(null, "google")} />
        </div>
      </div>
    </div>
  </div>
);
