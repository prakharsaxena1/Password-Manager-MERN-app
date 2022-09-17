import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const MyNav = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          className="fs-2 align-items-center d-flex"
        >
          <img
            alt="nav-logo"
            src="./security.png"
            width="50"
            height="50"
            className="d-inline-block mx-2"
          />{" "}
          Password Manager
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/login" className="fw-bold fs-4 mx-2">
              Login
            </Nav.Link>
            <Nav.Link as={Link} to="/register" className="fw-bold fs-4 mx-2">
              Register
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNav;
