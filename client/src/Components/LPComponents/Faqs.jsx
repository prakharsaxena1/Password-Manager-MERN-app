import React from "react";
import { Container, Accordion, ListGroup } from "react-bootstrap";

const Faqs = () => {
  return (
    <Container className="my-5">
      <h1 className="display-3 text-center my-5">FAQs</h1>
      <Accordion className="p-3">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            Why is password manager the most trustworthy choice?
          </Accordion.Header>
          <Accordion.Body>
            Our password manager uses the most advanced level of algorithms and
            maintain high standards to encrypt your passwords, so that your
            passwords can never be cracked.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Are my passwords secure?</Accordion.Header>
          <Accordion.Body>
            Yes, password manager is based on such a model that even we don't
            know your passwords we don't use any common key for encryption. So
            that only you are able to see your passwords
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Why use password manager?</Accordion.Header>
          <Accordion.Body>
            Here are some of the reasons why you should use password manager:{" "}
            <ListGroup variant="flush" as="ol" numbered>
              <ListGroup.Item as="li">
                One password to rule them all
              </ListGroup.Item>
              <ListGroup.Item as="li">Generate random passwords</ListGroup.Item>
              <ListGroup.Item as="li">
                Simple access to multiple accounts
              </ListGroup.Item>
              <ListGroup.Item as="li">
                Easily change your passwords
              </ListGroup.Item>
            </ListGroup>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default Faqs;
