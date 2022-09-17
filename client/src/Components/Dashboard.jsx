import React from "react";
import { Container } from "react-bootstrap";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardNav from "./DashboardComponents/DashboardNav";
import Passwords from "./DashboardComponents/Passwords";
import Shared from "./DashboardComponents/Shared";
import Account from "./DashboardComponents/Account.jsx";
import Logout from "./DashboardComponents/Logout";
import Cookies from "js-cookie";

function Dashboard({ navigate }) {
  if (!Cookies.get("auth_token")) {
    return <Navigate to="/login" />;
  }
  return (
    <Container
      fluid
      className="p-0"
      style={{ height: "100vh", overflow: "hidden" }}
    >
      <DashboardNav />
      <Routes>
        <Route path="" element={<Navigate to="passwords" />} />
        <Route path="passwords" element={<Passwords />} />
        <Route path="shared" element={<Shared />} />
        <Route path="account" element={<Account />} />
        <Route path="logout" element={<Logout />} />
        <Route path="*" element={<Navigate to="passwords" />} />
      </Routes>
    </Container>
  );
}

export default Dashboard;
