import { BrowserRouter } from "react-router-dom";
import { create, act } from "react-test-renderer";
import LogInPage from "../../../screens/LogInPage";

describe("Login page", () => {
  let tree, instance, props, element;
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
      element = instance.findByProps({ name: "password" });
      element.props.onChange({ target: { name: "password", value: "abcde" } });
    });
    element = instance.findByProps({ testId: "loginButton" });

    expect(element.props.disabled).toBe(false);
  });

  // to be continued...
  // it("should send a api call if login button is clicked with valid values", () => {
  //   act(() => {
  //     element = instance.findByProps({ name: "logInId" });
  //     element.props.onChange({ target: { name: "logInId", value: "1234" } });
  //     element = instance.findByProps({ name: "password" });
  //     element.props.onChange({ target: { name: "password", value: "abcde" } });
  //     element = instance.findByProps({ testId: "loginButton" });
  //     element.props.onClick();
  //   });
  // });
});
