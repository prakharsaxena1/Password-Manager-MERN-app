import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const Hero = ({ navigate }) => {
  return (
    <Container className="col-xxl-8 p-3">
      <Row className="flex-lg-row-reverse align-items-center">
        <Col sm={12} lg={6}>
          <img
            src="./security_landingpage.png"
            className="d-block mx-auto img-fluid"
            alt="logo landing page"
            width="550"
            height="450"
            loading="lazy"
          />
        </Col>
        <Col lg={6}>
          <h1 className="display-5 fw-bold lh-1 mb-3">
            Secure passwords in a vault
          </h1>
          <p className="lead">
            From storing old passwords to creating new ones, Password Manager is
            the simple solution for protecting all of them. Its free and always
            will be.
          </p>
          <Button
            variant="primary"
            size="lg"
            className="px-4 me-2"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
          <Button
            variant="outline-dark"
            size="lg"
            className="px-4"
            onClick={() => navigate("/register")}
          >
            Create an account
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Hero;
