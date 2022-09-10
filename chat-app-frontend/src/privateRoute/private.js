import React from "react";
import { Navigate } from "react-router-dom";
import useCurrentLocalState from "../util/storage";

const PrivateRoute = ({ children }) => {
  const bool = false;
  const [jwt, setJwt] = useCurrentLocalState("", "jwt");
  console.log(jwt);
  if (jwt) {
    return children;
  }
  // only remove if user isnt logged in
  // localStorage.removeItem("jwt");
  return <Navigate to={"/login"} />;
};

export default PrivateRoute;
