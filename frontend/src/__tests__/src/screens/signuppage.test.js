import { BrowserRouter } from "react-router-dom";
import { create, act } from "react-test-renderer";
import SignUpPage from "../../../screens/SignUpPage";

describe("input and button scenarios", () => {
  let tree, instance, element;
  beforeAll(() => {
    tree = create(
      <BrowserRouter>
        <SignUpPage />
      </BrowserRouter>
    );
    instance = tree.root;
  });

  it("should render the singup page correctly", () => {
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("should change the input field type if show button is clicked on password field", () => {
    element = instance.findByProps({ testId: "passwordButton" });
    act(() => {
      element.props.onClick();
    });
    element = instance.findByProps({ name: "password" });

    expect(element.props.type).toBe("text");
  });

  it("should change the input field type if hide button is clicked on password field", () => {
    element = instance.findByProps({ testId: "passwordButton" });
    act(() => {
      element.props.onClick();
    });
    element = instance.findByProps({ name: "password" });

    expect(element.props.type).toBe("password");
  });

  it("should disable singup button if input values are empty in input field", () => {
    element = instance.findByProps({ testId: "signupButton" });

    expect(element.props.disabled).toBe(true);
  });

  it("should not disable singup button if valid values are present in the input field", () => {
    act(() => {
      element = instance.findByProps({ name: "logInId" });
      element.props.onChange({ target: { name: "logInId", value: "1234" } });
    });
    act(() => {
      element = instance.findByProps({ name: "fullName" });
      element.props.onChange({ target: { name: "fullName", value: "bala" } });
    });
    act(() => {
      element = instance.findByProps({ name: "userName" });
      element.props.onChange({ target: { name: "userName", value: "bala_" } });
    });
    act(() => {
      element = instance.findByProps({ name: "password" });
      element.props.onChange({ target: { name: "password", value: "abcdef" } });
    });
    element = instance.findByProps({ testId: "signupButton" });

    expect(element.props.disabled).toBe(false);
  });

  it("should display a error message when user logs in using invalid user id - email", () => {
    act(() => {
      element = instance.findByProps({ name: "logInId" });
      element.props.onChange({ target: { name: "logInId", value: "ab" } });
    });
    act(() => {
      element = instance.findByProps({ name: "fullName" });
      element.props.onChange({ target: { name: "fullName", value: "bala" } });
    });
    act(() => {
      element = instance.findByProps({ name: "userName" });
      element.props.onChange({ target: { name: "userName", value: "bala_" } });
    });
    act(() => {
      element = instance.findByProps({ name: "password" });
      element.props.onChange({ target: { name: "password", value: "abcdef" } });
    });
    act(() => {
      element = instance.findByProps({ testId: "signupButton" });
      element.props.onClick();
    });
    element = instance.findAllByType("span");
    const errorMsgLength = element.filter(
      (spanElement) =>
        spanElement.props.children === "Enter a valid email address."
    ).length;

    expect(errorMsgLength).toBe(1);
  });

  it("should display a error message when user logs in using invalid user id - mobile number", () => {
    act(() => {
      element = instance.findByProps({ name: "logInId" });
      element.props.onChange({ target: { name: "logInId", value: "12" } });
    });
    act(() => {
      element = instance.findByProps({ name: "fullName" });
      element.props.onChange({ target: { name: "fullName", value: "bala" } });
    });
    act(() => {
      element = instance.findByProps({ name: "userName" });
      element.props.onChange({ target: { name: "userName", value: "bala_" } });
    });
    act(() => {
      element = instance.findByProps({ name: "password" });
      element.props.onChange({ target: { name: "password", value: "abcdef" } });
    });
    act(() => {
      element = instance.findByProps({ testId: "signupButton" });
      element.props.onClick();
    });
    element = instance.findAllByType("span");
    const errorMsgLength = element.filter(
      (spanElement) =>
        spanElement.props.children ===
        "Looks like your phone number may be incorrect. Please try entering your full number, including the country code."
    ).length;

    expect(errorMsgLength).toBe(1);
  });

  it("should not display a error message when user logs in using invalid password", () => {
    act(() => {
      element = instance.findByProps({ name: "logInId" });
      element.props.onChange({ target: { name: "logInId", value: "12" } });
    });
    act(() => {
      element = instance.findByProps({ name: "fullName" });
      element.props.onChange({ target: { name: "fullName", value: "bala" } });
    });
    act(() => {
      element = instance.findByProps({ name: "userName" });
      element.props.onChange({ target: { name: "userName", value: "bala_" } });
    });
    act(() => {
      element = instance.findByProps({ name: "password" });
      element.props.onChange({ target: { name: "password", value: "abcd" } });
    });
    act(() => {
      element = instance.findByProps({ testId: "signupButton" });
      element.props.onClick();
    });
    element = instance.findAllByType("span");
    const errorMsgLength = element.filter(
      (spanElement) =>
        spanElement.props.children ===
        "Sorry, your password was incorrect. Please double-check your password."
    ).length;

    expect(errorMsgLength).toBe(0);
  });

  it("should not display a error message when user logs in using invalid user name", () => {
    act(() => {
      element = instance.findByProps({ name: "logInId" });
      element.props.onChange({ target: { name: "logInId", value: "12" } });
    });
    act(() => {
      element = instance.findByProps({ name: "fullName" });
      element.props.onChange({ target: { name: "fullName", value: "bala" } });
    });
    act(() => {
      element = instance.findByProps({ name: "userName" });
      element.props.onChange({ target: { name: "userName", value: 1 } });
    });
    act(() => {
      element = instance.findByProps({ name: "password" });
      element.props.onChange({ target: { name: "password", value: "abcdef" } });
    });
    act(() => {
      element = instance.findByProps({ testId: "signupButton" });
      element.props.onClick();
    });
    element = instance.findAllByType("span");
    const errorMsgLength = element.filter(
      (spanElement) =>
        spanElement.props.children ===
        "This username isn't available. Please try another."
    ).length;

    expect(errorMsgLength).toBe(0);
  });
});

describe("api call - positive scenarios", () => {
  let tree,
    instance,
    element,
    token = "json web token here";
  beforeAll(() => {
    tree = create(
      <BrowserRouter>
        <SignUpPage />
      </BrowserRouter>
    );
    instance = tree.root;
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("should receive a jwt token if singup request is successful with mobileNumber", async () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      headers: {
        get: jest.fn().mockReturnValue(token),
      },
      json: jest.fn().mockResolvedValue({ mobileNumber: "1234" }),
    });
    act(() => {
      element = instance.findByProps({ name: "logInId" });
      element.props.onChange({ target: { name: "logInId", value: "1234" } });
    });
    act(() => {
      element = instance.findByProps({ name: "userName" });
      element.props.onChange({ target: { name: "userName", value: "bala_" } });
    });
    act(() => {
      element = instance.findByProps({ name: "password" });
      element.props.onChange({ target: { name: "password", value: "abcdef" } });
    });
    act(() => {
      element = instance.findByProps({ name: "password" });
      element.props.onChange({ target: { name: "password", value: "abcdef" } });
    });
    await act(async () => {
      element = instance.findByProps({ testId: "signupButton" });
      element.props.onClick();
    });

    expect(localStorage.getItem("token")).toBe(token);
  });

  it("should receive a jwt token if singup request is successful with email", async () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      headers: {
        get: jest.fn().mockReturnValue(token),
      },
      json: jest.fn().mockResolvedValue({ email: "abc@abc.com" }),
    });
    act(() => {
      element = instance.findByProps({ name: "logInId" });
      element.props.onChange({
        target: { name: "logInId", value: "abc@abc.com" },
      });
    });
    act(() => {
      element = instance.findByProps({ name: "userName" });
      element.props.onChange({ target: { name: "userName", value: "bala_" } });
    });
    act(() => {
      element = instance.findByProps({ name: "password" });
      element.props.onChange({ target: { name: "password", value: "abcdef" } });
    });
    act(() => {
      element = instance.findByProps({ name: "password" });
      element.props.onChange({ target: { name: "password", value: "abcdef" } });
    });
    await act(async () => {
      element = instance.findByProps({ testId: "signupButton" });
      element.props.onClick();
    });

    expect(localStorage.getItem("token")).toBe(token);
  });
});

describe("api call - negative scenarios", () => {
  let tree, instance, element;
  beforeAll(() => {
    tree = create(
      <BrowserRouter>
        <SignUpPage />
      </BrowserRouter>
    );
    instance = tree.root;
  });

  let mockResponse = (response) => {
    response
      ? jest.spyOn(global, "fetch").mockResolvedValue({
          text: jest.fn().mockResolvedValue(response),
        })
      : jest.spyOn(global, "fetch").mockRejectedValue("connection error");
  };

  it("should display a error message when user logs in using invalid user id - mobile number", async () => {
    mockResponse("user already exists");
    act(() => {
      element = instance.findByProps({ name: "logInId" });
      element.props.onChange({ target: { name: "logInId", value: "1234" } });
    });
    act(() => {
      element = instance.findByProps({ name: "userName" });
      element.props.onChange({ target: { name: "userName", value: "bala_" } });
    });
    act(() => {
      element = instance.findByProps({ name: "password" });
      element.props.onChange({ target: { name: "password", value: "abcdef" } });
    });
    act(() => {
      element = instance.findByProps({ name: "password" });
      element.props.onChange({ target: { name: "password", value: "abcdef" } });
    });
    await act(async () => {
      element = instance.findByProps({ testId: "signupButton" });
      element.props.onClick();
    });
    element = instance.findAllByType("span");
    const errorMsgLength = element.filter(
      (spanElement) =>
        spanElement.props.children ===
        "Looks like your phone number may be incorrect. Please try entering your full number, including the country code."
    ).length;

    expect(errorMsgLength).toBe(1);
    expect(localStorage.getItem("token")).toBe(null);
  });

  it("should display a error message when user logs in using invalid user id - email", async () => {
    mockResponse("user already exists");
    act(() => {
      element = instance.findByProps({ name: "logInId" });
      element.props.onChange({
        target: { name: "logInId", value: "abc@gmail.com" },
      });
    });
    act(() => {
      element = instance.findByProps({ name: "userName" });
      element.props.onChange({ target: { name: "userName", value: "bala_" } });
    });
    act(() => {
      element = instance.findByProps({ name: "password" });
      element.props.onChange({ target: { name: "password", value: "abcdef" } });
    });
    act(() => {
      element = instance.findByProps({ name: "password" });
      element.props.onChange({ target: { name: "password", value: "abcdef" } });
    });
    await act(async () => {
      element = instance.findByProps({ testId: "signupButton" });
      element.props.onClick();
    });
    element = instance.findAllByType("span");
    const errorMsgLength = element.filter(
      (spanElement) =>
        spanElement.props.children === "Enter a valid email address."
    ).length;

    expect(errorMsgLength).toBe(1);
    expect(localStorage.getItem("token")).toBe(null);
  });

  it("should display a error message when user logs in using invalid user name", async () => {
    mockResponse("User name already exists");
    act(() => {
      element = instance.findByProps({ name: "logInId" });
      element.props.onChange({ target: { name: "logInId", value: "1234" } });
    });
    act(() => {
      element = instance.findByProps({ name: "userName" });
      element.props.onChange({ target: { name: "userName", value: "bala_" } });
    });
    act(() => {
      element = instance.findByProps({ name: "password" });
      element.props.onChange({ target: { name: "password", value: "abcdef" } });
    });
    act(() => {
      element = instance.findByProps({ name: "password" });
      element.props.onChange({ target: { name: "password", value: "abcdef" } });
    });
    await act(async () => {
      element = instance.findByProps({ testId: "signupButton" });
      element.props.onClick();
    });
    element = instance.findAllByType("span");
    const errorMsgLength = element.filter(
      (spanElement) =>
        spanElement.props.children ===
        "This username isn't available. Please try another."
    ).length;

    expect(errorMsgLength).toBe(1);
    expect(localStorage.getItem("token")).toBe(null);
  });

  it("should display the error message in console when api request fails", async () => {
    mockResponse();
    const consoleSpy = jest.spyOn(console, "log");
    act(() => {
      element = instance.findByProps({ name: "logInId" });
      element.props.onChange({ target: { name: "logInId", value: "1234" } });
    });
    act(() => {
      element = instance.findByProps({ name: "userName" });
      element.props.onChange({ target: { name: "userName", value: "bala_" } });
    });
    act(() => {
      element = instance.findByProps({ name: "password" });
      element.props.onChange({ target: { name: "password", value: "abcdef" } });
    });
    act(() => {
      element = instance.findByProps({ name: "password" });
      element.props.onChange({ target: { name: "password", value: "abcdef" } });
    });
    await act(async () => {
      element = instance.findByProps({ testId: "signupButton" });
      element.props.onClick();
    });

    expect(consoleSpy).toHaveBeenCalledWith("connection error");
  });
});
