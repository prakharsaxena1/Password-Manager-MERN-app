import React, { Suspense } from "react";
import { Container, Spinner } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

// Components
const MyNav = React.lazy(() => import("./LPComponents/MyNav"));
const Hero = React.lazy(() => import("./LPComponents/Hero"));
const Footer = React.lazy(() => import("./LPComponents/Footer"));
const Reviews = React.lazy(() => import("./LPComponents/Reviews"));
const Faqs = React.lazy(() => import("./LPComponents/Faqs"));

const LandingPage = ({ navigate }) => {
  if (Cookies.get("auth_token")) {
    return <Navigate to="/app" />;
  }
  return (
    <Suspense
      fallback={
        <Spinner animation="grow" variant="primary" className="text-center" />
      }
    >
      <MyNav />
      <Container
        fluid
        style={{
          height: "calc( 100vh - 76px )",
          overflow: "hidden",
          overflowY: "auto",
          padding: 0,
        }}
      >
        <Hero navigate={navigate} />
        <Reviews />
        <Faqs />
        <Footer />
      </Container>
    </Suspense>
  );
};

export default LandingPage;
