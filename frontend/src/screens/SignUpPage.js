import React, { useState, useEffect } from "react";
import "../css/styles.css";
import { Link } from "react-router-dom";

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
    console.log(formData);
    // TODO:to be continued...
    // const requestOptions = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     email: formData.logInId,
    //     fullName: formData.fullName,
    //     userName: formData.userName,
    //     password: formData.password,
    //   }),
    // };
    // fetch("http://locahost:5000/user/signup", requestOptions).then(
    //   (res) => console.log(res.json()),
    //   (error) => console.log(error)
    // );
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
              type="password"
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
              Sign up
            </button>
          </div>
          <span className="errorMessageHidden">
            Sorry, your password was incorrect. Please double-check your
            password.
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
};

export default SignUpPage;
