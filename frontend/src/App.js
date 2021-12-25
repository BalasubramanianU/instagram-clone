import { Routes, Route } from "react-router-dom";
import "./css/styles.css";
import LogInPage from "./screens/LogInPage";
import SignUpPage from "./screens/SignUpPage";

const App = () => {
  return (
    <Routes>
      {["/", "/login"].map((path, index) => (
        <Route key={index} path={path} element={<LogInPage />} />
      ))}
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
  );
};

export default App;
