import React from "react";
import "../css/styles.css";
import { Link } from "react-router-dom";

const LogInPage = () => {
  return (
    <div className="backgroundLayer">
      <div className="header"></div>
      <div className="gridContainer">
        <div className="welcomeImage">
          <div className="screenshot"></div>
        </div>
        <div className="loginBox">
          <div className="logo"></div>
          <div className="inputField">
            <input
              type="text"
              minlength="1"
              maxlength="255"
              placeholder="Phone number, username, or email"
              required
            />
            <span className="nameSpan">Phone number, username, or email</span>
          </div>
          <div className="inputField">
            <input
              type="password"
              minlength="1"
              maxlength="1024"
              placeholder="Password"
              required
            />
            <span className="passwordSpan">Password</span>
            <button>Show</button>
          </div>
          <div className="buttonContainer">
            <button className="button" disabled>
              Log In
            </button>
          </div>
          <div className="orComponent">
            <div className="lineStrike"></div>
            <p className="orText">OR</p>
            <div className="lineStrike"></div>
          </div>
          <button className="loginButton">
            <div className="iconContainerLogin">
              <div className="fbIconLogin">
                <ion-icon name="logo-facebook"></ion-icon>
              </div>
            </div>
            Log in with Facebook
          </button>
          <span className="errorMessageHidden">
            Sorry, your password was incorrect. Please double-check your
            password.
          </span>
          <button className="forgotPassword">
            <a className="forgotPasswordText" href>
              Forgot password?
            </a>
          </button>
        </div>
        <div className="switchAuthMethodBox">
          <p className="generalText">
            Don't have an account?
            <Link className="signUp" to="/signup">
              Sign up
            </Link>
          </p>
        </div>
        <div className="appStoreContainer">
          <p className="generalText">Get the app.</p>
          <div className="appStoreImages">
            <button className="googlePlay"></button>
            <button className="appStore"></button>
          </div>
        </div>
      </div>
      <div className="footerContainer">
        <div className="footer">
          <div className="footerFirstRow">
            <a className="footerText" href>
              About
            </a>
            <a className="footerText" href>
              Blog
            </a>
            <a className="footerText" href>
              Jobs
            </a>
            <a className="footerText" href>
              Help
            </a>
            <a className="footerText" href>
              API
            </a>
            <a className="footerText" href>
              Privacy
            </a>
            <a className="footerText" href>
              Terms
            </a>
            <a className="footerText" href>
              Top Accounts
            </a>
            <a className="footerText" href>
              Hashtags
            </a>
            <a className="footerText" href>
              Locations
            </a>
            <a className="footerText" href>
              Instagram Lite
            </a>
          </div>
          <div className="footerSecondRow">
            <select className="footerDropdown">
              <option>English</option>
            </select>
            <p className="smallText">&copy 2021 Instagram from Facebook</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogInPage;
