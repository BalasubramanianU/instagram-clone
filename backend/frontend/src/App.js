import { Routes, Route } from "react-router-dom";
import "./css/styles.css";
import LogInPage from "./screens/LogInPage";
import SignUpPage from "./screens/SignUpPage";
import ProtectedRoute from "./utils/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      {["/", "/login"].map((path, index) => (
        <Route key={index} path={path} element={<LogInPage />} />
      ))}
      <Route path="/signup" element={<SignUpPage />} />
      <Route element={<ProtectedRoute />}>
        <Route
          path="/home"
          element={
            <p>
              Welcome! <br></br>Home Page is currently under development. Thanks
              for checking out.
            </p>
          }
        />
      </Route>
      <Route path="*" element={<p>404 page not found</p>} />
    </Routes>
  );
};

export default App;
