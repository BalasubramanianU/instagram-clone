import React from "react";
import "../css/styles.css";
import { Link } from "react-router-dom";

const SignUpPage = () => (
  <div className="backgroundLayer">
    <div className="headerSignUp"></div>
    <div className="gridContainerSignUp">
      <div className="signUpBox">
        <div className="logo"></div>
        <p className="headerText">
          Sign up to see photos and videos from your friends.
        </p>
        <button className="signUpButton">
          <div className="iconContainerSignUp">
            <div className="fbIconSignUp">
              <ion-icon name="logo-facebook"></ion-icon>
            </div>
          </div>
          Log in with Facebook
        </button>
        <div className="orComponent">
          <div className="lineStrike"></div>
          <p className="orText">OR</p>
          <div className="lineStrike"></div>
        </div>
        <div className="inputField">
          <input
            type="text"
            minlength="1"
            maxlength="255"
            placeholder="Mobile Number or Email"
            required
          />
          <span className="nameSpan">Mobile Number or Email</span>
        </div>
        <div className="inputField">
          <input
            type="text"
            minlength="1"
            maxlength="255"
            placeholder="Full Name"
            required
          />
          <span className="nameSpan">Full Name</span>
        </div>
        <div className="inputField">
          <input
            type="text"
            minlength="1"
            maxlength="255"
            placeholder="Username"
            required
          />
          <span className="nameSpan">Username</span>
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
            Sign up
          </button>
        </div>
        <span className="errorMessageHidden">
          Sorry, your password was incorrect. Please double-check your password.
        </span>
        <p className="smallText">
          By signing up, you agree to our <b>Terms , Data Policy </b>and
          <b>Cookies Policy .</b>
        </p>
      </div>
      <div className="switchAuthMethodBoxSignUp">
        <p className="generalText">
          Have an account?
          <Link className="login" to="/login">
            Log in
          </Link>
        </p>
      </div>
      <div className="appStoreContainerSignUp">
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

export default SignUpPage;
