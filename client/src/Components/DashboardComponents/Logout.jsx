import React from "react";
import { logout } from "../../Services/app.service";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

function Logout() {
  if (!Cookies.get("auth_token")) {
    return <Navigate to="/login" />;
  } else {
    logout();
    return <Navigate to="/login" />;
  }
}

export default Logout;
