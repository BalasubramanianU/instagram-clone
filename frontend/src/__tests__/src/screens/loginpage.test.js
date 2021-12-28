import { BrowserRouter } from "react-router-dom";
import { create, act } from "react-test-renderer";
import LogInPage from "../../../screens/LogInPage";

describe("input and button scenarios", () => {
  let tree, instance, element;
  beforeAll(() => {
    tree = create(
      <BrowserRouter>
        <LogInPage />
      </BrowserRouter>
    );
    instance = tree.root;
  });

  it("should render the login page correctly", () => {
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("should change the input field type if show button is clicked on password field", () => {
    element = instance.findByProps({ testId: "passwordButton" });
    element.props.onClick();
    element = instance.findByProps({ name: "password" });

    expect(element.props.type).toBe("text");
  });

  it("should change the input field type if hide button is clicked on password field", () => {
    element = instance.findByProps({ testId: "passwordButton" });
    element.props.onClick();
    element = instance.findByProps({ name: "password" });

    expect(element.props.type).toBe("password");
  });

  it("should disable login button if input values are empty in input field", () => {
    element = instance.findByProps({ testId: "loginButton" });

    expect(element.props.disabled).toBe(true);
  });

  it("should not disable login button if valid values are present in the input field", () => {
    act(() => {
      element = instance.findByProps({ name: "logInId" });
      element.props.onChange({ target: { name: "logInId", value: "1234" } });
    });
    act(() => {
      element = instance.findByProps({ name: "password" });
      element.props.onChange({ target: { name: "password", value: "abcdef" } });
    });
    element = instance.findByProps({ testId: "loginButton" });

    expect(element.props.disabled).toBe(false);
  });

  it("should display a error message when user logs in using invalid password", () => {
    act(() => {
      element = instance.findByProps({ name: "logInId" });
      element.props.onChange({ target: { name: "logInId", value: "1234" } });
    });
    act(() => {
      element = instance.findByProps({ name: "password" });
      element.props.onChange({ target: { name: "password", value: "abcd" } });
    });
    act(() => {
      element = instance.findByProps({ testId: "loginButton" });
      element.props.onClick();
    });
    element = instance.findAllByType("span");
    const errorMsgLength = element.filter(
      (spanElement) =>
        spanElement.props.children ===
        "Sorry, your password was incorrect. Please double-check your password."
    ).length;

    expect(errorMsgLength).toBe(1);
  });

  it("should display a error message when user logs in using invalid user id", () => {
    act(() => {
      element = instance.findByProps({ name: "logInId" });
      element.props.onChange({ target: { name: "logInId", value: "" } });
    });
    act(() => {
      element = instance.findByProps({ name: "password" });
      element.props.onChange({ target: { name: "password", value: "abcdef" } });
    });
    act(() => {
      element = instance.findByProps({ testId: "loginButton" });
      element.props.onClick();
    });
    element = instance.findAllByType("span");
    const errorMsgLength = element.filter(
      (spanElement) =>
        spanElement.props.children ===
        "The username you entered doesn't belong to an account. Please check your username and try again."
    ).length;

    expect(errorMsgLength).toBe(1);
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
        <LogInPage />
      </BrowserRouter>
    );
    instance = tree.root;
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("should receive a jwt token if login request is successful with mobileNumber", async () => {
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
      element = instance.findByProps({ name: "password" });
      element.props.onChange({ target: { name: "password", value: "abcdef" } });
    });
    await act(async () => {
      element = instance.findByProps({ testId: "loginButton" });
      element.props.onClick();
    });

    expect(localStorage.getItem("token")).toBe(token);
  });

  it("should receive a jwt token if login request is successful with email", async () => {
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
      element = instance.findByProps({ name: "password" });
      element.props.onChange({ target: { name: "password", value: "abcdef" } });
    });
    await act(async () => {
      element = instance.findByProps({ testId: "loginButton" });
      element.props.onClick();
    });

    expect(localStorage.getItem("token")).toBe(token);
  });

  it("should receive a jwt token if login request is successful with userName", async () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      headers: {
        get: jest.fn().mockReturnValue(token),
      },
      json: jest.fn().mockResolvedValue({ userName: "abc" }),
    });
    act(() => {
      element = instance.findByProps({ name: "logInId" });
      element.props.onChange({ target: { name: "logInId", value: "abc" } });
    });
    act(() => {
      element = instance.findByProps({ name: "password" });
      element.props.onChange({ target: { name: "password", value: "abcdef" } });
    });
    await act(async () => {
      element = instance.findByProps({ testId: "loginButton" });
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
        <LogInPage />
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

  it("should display a error message when user logs in using invalid user id", async () => {
    mockResponse("User does not exist");
    act(() => {
      element = instance.findByProps({ name: "logInId" });
      element.props.onChange({ target: { name: "logInId", value: "1234" } });
    });
    act(() => {
      element = instance.findByProps({ name: "password" });
      element.props.onChange({ target: { name: "password", value: "abcdef" } });
    });
    await act(async () => {
      element = instance.findByProps({ testId: "loginButton" });
      element.props.onClick();
    });
    element = instance.findAllByType("span");
    const errorMsgLength = element.filter(
      (spanElement) =>
        spanElement.props.children ===
        "The username you entered doesn't belong to an account. Please check your username and try again."
    ).length;

    expect(errorMsgLength).toBe(1);
    expect(localStorage.getItem("token")).toBe(null);
  });

  it("should display a error message when user logs in using invalid password", async () => {
    mockResponse("Invalid password");
    act(() => {
      element = instance.findByProps({ name: "logInId" });
      element.props.onChange({ target: { name: "logInId", value: "1234" } });
    });
    act(() => {
      element = instance.findByProps({ name: "password" });
      element.props.onChange({ target: { name: "password", value: "abcdef" } });
    });
    await act(async () => {
      element = instance.findByProps({ testId: "loginButton" });
      element.props.onClick();
    });
    element = instance.findAllByType("span");
    const errorMsgLength = element.filter(
      (spanElement) =>
        spanElement.props.children ===
        "Sorry, your password was incorrect. Please double-check your password."
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
      element = instance.findByProps({ name: "password" });
      element.props.onChange({ target: { name: "password", value: "abcdef" } });
    });
    await act(async () => {
      element = instance.findByProps({ testId: "loginButton" });
      element.props.onClick();
    });

    expect(consoleSpy).toHaveBeenCalledWith("connection error");
  });
});
