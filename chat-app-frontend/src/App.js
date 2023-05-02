import { Route, Routes } from "react-router-dom";

import LogInPage from "./pages/login/LogInPage";
import LandingPage from "./pages/landing/LandingPage";
import MainPage from "./pages/mainPage/MainPage";
import "./index.css";
import PrivateRoute from "./privateRoute/private";

function App() {
  // fetch returns a promise<response>
  // body is where you pass the json data
  // you can also use JSON.stringify(data) for converting js objects to json
  // then() can be used to access the respons

  fetch("api/v1/users", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  }).then((response) => console.log(response));
  return (
    <Routes>
      <Route path="/login" element={<LogInPage />} />
      <Route
        path="/main-page"
        element={
          <PrivateRoute>
            <MainPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/"
        element={ 
          <LandingPage />
        }
      />
    </Routes>
  );
}

export default App;
