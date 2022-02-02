import { BrowserRouter } from "react-router-dom";
import { create } from "react-test-renderer";
import App from "../../App";

describe("app.js", () => {
  let tree;
  it("should render the app correctly", () => {
    tree = create(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});
