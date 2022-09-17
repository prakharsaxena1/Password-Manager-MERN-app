import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const Page404 = ({ navigate }) => {
  return (
    <Container style={{ height: "100vh" }}>
      <Row>
        <Col md={12}>
          <div className="text-center p-5">
            <h1 className="display-1">Oops!</h1>
            <h2 className="display-5">404 Not Found</h2>
            <p className="my-2">
              Sorry, an error has occured, Requested page not found!
            </p>
            <Button
              variant="outline-primary"
              className="mt-3"
              onClick={() => {
                navigate("/");
              }}
            >
              Take Me Home
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Page404;
