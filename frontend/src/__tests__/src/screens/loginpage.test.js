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

  it("should receive a jwt token if login request is successful", async () => {
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
});

describe("api call - negative scenarios", () => {
  let tree, instance, element, mockResponse;
  beforeAll(() => {
    tree = create(
      <BrowserRouter>
        <LogInPage />
      </BrowserRouter>
    );
    instance = tree.root;
  });

  beforeEach(() => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      text: jest.fn().mockResolvedValue(mockResponse),
    });
  });

  mockResponse = "User does not exist";
  it("should display a error message when user logs in using invalid user id", async () => {
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
    const errorMsg = element.filter((element) => {
      element.children[0] ===
        "The username you entered doesn't belong to an account. Please check your username and try again.";
    });

    expect(errorMsg.length).toBe(1);
    expect(localStorage.getItem("token")).toBe(null);
  });

  mockResponse = "Invalid password";
  it("should display a error message when user logs in using invalid password", async () => {
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
    const errorMsg = element.filter((element) => {
      element.children[0] ===
        "Sorry, your password was incorrect. Please double-check your password.";
    });

    expect(errorMsg.length).toBe(1);
    expect(localStorage.getItem("token")).toBe(null);
  });
});
