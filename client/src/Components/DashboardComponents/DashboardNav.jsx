import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { logout } from "../../Services/app.service";
import { getUser } from "../../Services/app.service";

function DashboardNav() {
  const { username } = getUser();
  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand to="" as={Link}>
          Password Manager
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="ms-auto" navbarScroll>
            <Nav.Link to="passwords" as={Link}>
              Passwords
            </Nav.Link>
            <NavDropdown title={username} id="navbarScrollingDropdown">
              <NavDropdown.Item to="shared" as={Link}>
                Shared password
              </NavDropdown.Item>
              <NavDropdown.Item to="account" as={Link}>
                Account
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item to="logout" as={Link} onClick={logout}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default DashboardNav;
