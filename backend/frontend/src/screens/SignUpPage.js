import React, { useState, useEffect } from "react";
import "../css/styles.css";
import { Link } from "react-router-dom";
import {
  validateEmail,
  validateName,
  validateNumber,
  validatePassword,
} from "../utils/userValidation";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    logInId: "",
    fullName: "",
    userName: "",
    password: "",
  });
  const [isValid, setIsValid] = useState(false);
  const [passwordField, setPasswordField] = useState({
    inputType: "password",
    button: "Show",
  });
  const [error, setError] = useState({});

  useEffect(() => {
    if (
      formData.logInId.length > 0 &&
      formData.fullName.length > 0 &&
      formData.userName.length > 0 &&
      formData.password.length > 5
    ) {
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
    const apiCall = async (loginType) => {
      if (!loginType) return;
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          [loginType]: formData.logInId,
          fullName: formData.fullName,
          userName: formData.userName,
          password: formData.password,
        }),
      };
      try {
        setIsValid(false);
        const response = await fetch(
          // "http://192.168.1.8:5000/user/signup",
          "https://insta-clone-bala.herokuapp.com/user/signup",
          requestOptions
        );
        if (response.ok) {
          localStorage.token = response.headers.get("x-auth-header");
          setIsValid(true);
          return;
        }
        const errorMessage = await response.text();
        if (errorMessage.includes("user already exists")) {
          if (Number.isInteger(Number(formData.logInId)))
            setError({ mobileNumber: true });
          else setError({ email: true });
        }
        if (errorMessage.includes("User name already exists"))
          setError({ userName: true });
        setIsValid(true);
      } catch (error) {
        // all the errors in the try block will accumulate here, you need to
        // write logic here if you want to handle connection failed and other
        // exceptions/errors seperately.
        console.log(error);
        setIsValid(true);
      }
    };
    if (validatePassword(formData.password).error) return;
    if (validateName(formData.userName).error) return;
    if (!validateEmail(formData.logInId).error) apiCall("email");
    else if (!validateNumber(formData.logInId).error) apiCall("mobileNumber");
    else {
      if (Number.isInteger(Number(formData.logInId)))
        return setError({ mobileNumber: true });
      else return setError({ email: true });
    }
    setError({});
  };

  return (
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
              minLength="1"
              maxLength="255"
              placeholder="Mobile Number or Email"
              required
              name="logInId"
              value={formData.logInId}
              onChange={handleChange}
            />
            <span className="nameSpan">Mobile Number or Email</span>
          </div>
          <div className="inputField">
            <input
              type="text"
              minLength="1"
              maxLength="255"
              placeholder="Full Name"
              required
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
            <span className="nameSpan">Full Name</span>
          </div>
          <div className="inputField">
            <input
              type="text"
              minLength="1"
              maxLength="255"
              placeholder="Username"
              required
              name="userName"
              value={formData.userName}
              onChange={handleChange}
            />
            <span className="nameSpan">Username</span>
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
              testId="signupButton"
            >
              Sign up
            </button>
          </div>
          {error.email && (
            <span className="errorMessage">Enter a valid email address.</span>
          )}
          {error.mobileNumber && (
            <span className="errorMessage">
              Looks like your phone number may be incorrect. Please try entering
              your full number, including the country code.
            </span>
          )}
          {error.userName && (
            <span className="errorMessage">
              This username isn't available. Please try another.
            </span>
          )}

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
};

export default SignUpPage;
