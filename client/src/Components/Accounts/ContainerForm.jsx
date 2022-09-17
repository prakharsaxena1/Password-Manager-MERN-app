import React from "react";
import { Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function ContainerForm(props) {
  return (
    <>
      <Container fluid style={{ height: "7vh", paddingTop: "15px" }}>
        <Nav.Link as={Link} to="/" className="fs-4 text-dark w-100 text-center">
          <img
            alt="nav-logo"
            src="./security.png"
            width="50"
            height="50"
            className="d-inline-block mx-2"
          />
          {""}
          Password Manager
        </Nav.Link>
      </Container>
      <Container fluid style={{ height: "93vh", paddingTop: "120px" }}>
        <Container
          style={{ maxWidth: "550px", minHeight: "600px" }}
          className="rounded shadow-lg p-sm-5 p-4 bg-light"
        >
          <h1 className="my-3 text-center">{props.formText}</h1>
          {props.children}
        </Container>
        <Container
          style={{ maxWidth: "550px", minHeight: "40px" }}
          className="py-2"
        >
          <h5 className="text-center text-muted fst-italic">
            Password Manager © 2022
          </h5>
        </Container>
      </Container>
    </>
  );
}

export default ContainerForm;
