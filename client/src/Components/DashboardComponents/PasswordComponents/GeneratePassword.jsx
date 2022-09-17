import React, { useState } from "react";
import { Form, Accordion, Container, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { CopyToClipboard } from "react-copy-to-clipboard";

const GeneratePassword = () => {
  const [rangeValue, setRangeValue] = useState(12);
  const [pwd, setPwd] = useState(" ");
  const [uppercaseValue, setUppercaseValue] = useState(false);
  const [numberValue, setNumberValue] = useState(false);
  const [specialValue, setSpecialValue] = useState(false);

  const makePassword = () => {
    const numbers = "0123456789";
    const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const specialCharacters = "!@#$%^&*()_+=;:/?";
    let characterList = "abcdefghijklmnopqrstuvwxyz";

    if (uppercaseValue) {
      characterList += upperCaseLetters;
    }
    if (numberValue) {
      characterList += numbers;
    }
    if (specialValue) {
      characterList += specialCharacters;
    }
    let password = "";
    for (let i = 0; i < rangeValue; i++) {
      const characterIndex = Math.round(Math.random() * characterList.length);
      password = password + characterList.charAt(characterIndex);
    }
    setPwd(password);
  };

  return (
    <Container>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Generate password</Accordion.Header>
          <Accordion.Body className="px-5">
            <div className="d-flex align-items-baseline justify-centent-between">
              <h2 className="fst-italic fs-4">Password:</h2>
              <CopyToClipboard text={pwd}>
                <Button
                  onClick={() => {
                    toast.success("Copied successfully", {
                      position: "top-right",
                    });
                  }}
                  variant="outline-dark"
                  size="sm"
                  className="ms-auto"
                >
                  copy
                </Button>
              </CopyToClipboard>
            </div>
            <h2 className="fst-italic">{pwd}</h2>

            <Form>
              <div className="d-flex align-items-baseline justify-centent-between">
                <h5 className="fs-4">Length: {rangeValue}</h5>
                <input
                  className="ms-auto"
                  type="range"
                  min="12"
                  max="32"
                  value={rangeValue}
                  onChange={(e) => setRangeValue(e.target.value)}
                />
              </div>
              <div className="d-flex align-items-baseline justify-content-between">
                <h5 className="fs-4">Include uppercase: </h5>
                <Form.Check
                  type="switch"
                  value={uppercaseValue}
                  onChange={(e) => setUppercaseValue(e.target.checked)}
                />
              </div>
              <div className="d-flex align-items-baseline justify-content-between">
                <h5 className="fs-4">Include numbers: </h5>
                <Form.Check
                  type="switch"
                  value={numberValue}
                  onChange={(e) => setNumberValue(e.target.checked)}
                />
              </div>
              <div className="d-flex align-items-baseline justify-content-between">
                <h5 className="fs-4">Include special characters: </h5>
                <Form.Check
                  type="switch"
                  value={specialValue}
                  onChange={(e) => setSpecialValue(e.target.checked)}
                />
              </div>
              <Button variant="outline-dark" size="sm" onClick={makePassword}>
                Generate password
              </Button>
            </Form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <ToastContainer />
    </Container>
  );
};

export default GeneratePassword;
