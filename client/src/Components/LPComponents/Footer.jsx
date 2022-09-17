import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="text-center text-lg-start bg-light text-muted">
      <Container className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="d-none d-lg-block">
          <span>Get connected with us on social networks:</span>
        </div>
        <div>
          <a href="#facebook" className="me-4 text-dark">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#twitter" className="me-4 text-dark">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#google" className="me-4 text-dark">
            <i className="fab fa-google"></i>
          </a>
          <a href="#instagram" className="me-4 text-dark">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#linkedin" className="me-4 text-dark">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="#github" className=" text-dark">
            <i className="fab fa-github"></i>
          </a>
        </div>
      </Container>
      <Container fluid>
        <Container className="text-center text-md-start mt-5">
          <Row className="mt-3">
            <Col md={3} lg={4} xl={3} className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <i className="fas fa-gem me-3"></i>Password Manager
              </h6>
              <p>
                Providing the best available security system to secure user data
              </p>
            </Col>
            <Col md={4} lg={3} xl={3} className="mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <i className="fas fa-home me-3"></i> New York, NY 10012, US
              </p>
              <p>
                <i className="fas fa-envelope me-3"></i>info@example.com
              </p>
              <p>
                <i className="fas fa-phone me-3"></i> + 01 234 567 88
              </p>
              <p>
                <i className="fas fa-print me-3"></i> + 01 234 567 89
              </p>
            </Col>
          </Row>
        </Container>
      </Container>

      <Container
        fluid
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © 2022 Copyright: Password Manager
      </Container>
    </footer>
  );
};

export default Footer;
