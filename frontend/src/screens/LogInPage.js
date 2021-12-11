import React, { useState, useEffect } from "react";
import "../css/styles.css";
import { Link } from "react-router-dom";

const LogInPage = () => {
  const [formData, setFormData] = useState({ logInId: "", password: "" });
  const [isValid, setIsValid] = useState(false);
  const [passwordField, setPasswordField] = useState({
    inputType: "password",
    button: "Show",
  });

  useEffect(() => {
    if (formData.logInId.length > 0 && formData.password.length > 5) {
      return setIsValid(true);
    }
    setIsValid(false);
  }, [formData]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const passwordButtonClick = () => {
    passwordField.button === "Show"
      ? setPasswordField({ inputType: "text", button: "Hide" })
      : setPasswordField({ inputType: "password", button: "Show" });
  };

  const handleSubmit = () => {
    // TODO: to be continued...
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: formData.logInId,
        password: formData.password,
      }),
    };
    fetch("http://192.168.1.8:5000/user/login", requestOptions)
      .then((response) => {
        if (response.ok) return response.json();
        throw response;
        //Note:-throw will make the response reach below (error) block,
        // return will make the response reach below (data) block
      })
      .then(
        (data) => console.log(data),
        (error) => console.log(error)
      );
  };

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
              minLength="1"
              maxLength="255"
              placeholder="Phone number, username, or email"
              required
              name="logInId"
              value={formData.logInId}
              onChange={handleChange}
            />
            <span className="nameSpan">Phone number, username, or email</span>
          </div>
          <div className="inputField">
            <input
              type={passwordField.inputType}
              minLength="1"
              maxLength="1024"
              placeholder="Password"
              required
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <span className="passwordSpan">Password</span>
            <button onClick={passwordButtonClick}>
              {passwordField.button}
            </button>
          </div>
          <div className="buttonContainer">
            <button
              className="button"
              onClick={handleSubmit}
              disabled={!isValid}
            >
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
