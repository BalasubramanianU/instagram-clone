import React, { useState, useEffect } from "react";
import "../css/styles.css";
import { Link, useNavigate } from "react-router-dom";
import {
  validateEmail,
  validateName,
  validateNumber,
  validatePassword,
} from "../utils/userValidation";

const LogInPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ logInId: "", password: "" });
  const [isValid, setIsValid] = useState(false);
  const [passwordField, setPasswordField] = useState({
    inputType: "password",
    button: "Show",
  });
  const [error, setError] = useState({});

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

  // const check = async () => {
  //   const requestOptions = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "x-auth-header": localStorage.getItem("token"),
  //     },
  //   };
  //   try {
  //     const response = await fetch(
  //       "http://192.168.1.8:5000/home/",
  //       requestOptions
  //     );
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleSubmit = () => {
    const apiCall = async (loginType) => {
      if (!loginType) return;
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          [loginType]: formData.logInId,
          password: formData.password,
        }),
      };
      try {
        setIsValid(false);
        const response = await fetch(
          // "http://192.168.1.8:5000/user/login",
          "https://instat-clone.onrender.com/user/login",
          requestOptions
        );
        if (response.ok) {
          localStorage.token = response.headers.get("x-auth-header");
          const data = await response.json();
          setIsValid(true);
          // check();
          navigate("/home");
          return;
        }
        const errorMessage = await response.text();
        if (errorMessage.includes("User does not exist"))
          setError({ userName: true });
        if (errorMessage.includes("Invalid password"))
          setError({ password: true });
        setIsValid(true);
        // check();
      } catch (error) {
        // all the errors in the try block will accumulate here, you need to
        // write logic here if you want to handle connection failed and other
        // exceptions/errors seperately.
        console.log(error);
        setIsValid(true);
      }
    };
    if (validatePassword(formData.password).error) {
      return setError({ password: true });
    }
    if (!validateEmail(formData.logInId).error) apiCall("email");
    else if (!validateNumber(formData.logInId).error) apiCall("mobileNumber");
    else if (!validateName(formData.logInId).error) apiCall("userName");
    else {
      return setError({ userName: true });
    }
    setError({});
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
            <button onClick={passwordButtonClick} testId="passwordButton">
              {passwordField.button}
            </button>
          </div>
          <div className="buttonContainer">
            <button
              className="button"
              onClick={handleSubmit}
              disabled={!isValid}
              testId="loginButton"
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
          {error.userName && (
            <span className="errorMessage">
              The username you entered doesn't belong to an account. Please
              check your username and try again.
            </span>
          )}
          {error.password && (
            <span className="errorMessage">
              Sorry, your password was incorrect. Please double-check your
              password.
            </span>
          )}
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
              Meta
            </a>
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
            <a className="footerText" href>
              Contact Uploading & Non-Users
            </a>
          </div>
          <div className="footerSecondRow">
            <select className="footerDropdown">
              <option>English</option>
            </select>
            <p className="smallText">&copy; 2021 Instagram from Meta</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogInPage;
