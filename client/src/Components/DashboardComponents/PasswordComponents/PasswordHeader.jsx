import React from "react";
import { Container, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { show, hide } from "./../../../actions";
import { addSecret } from "../../../Services/app.service";

const PasswordHeader = ({ setControl, setInitialValues, setSecrets }) => {
  const dispatch = useDispatch();
  return (
    <Container
      fluid
      className="p-4 text-center d-flex flex-column flex-lg-row justify-content-around align-items-center bg-secondary text-white"
    >
      <h1 className="display-4 fst-italic">Passwords for all accounts</h1>
      <Button
        variant="primary"
        size="lg"
        onClick={() => {
          dispatch(show());
          setInitialValues((prev) => ({
            site_name: "",
            url: "",
            login: "",
            site_password: "",
          }));
          setControl((prev) => ({
            headingText: "Add a password",
            submitHandler: async (value) => {
              const res = await addSecret(value);
              setSecrets((prev) => [...prev, res.data]);
              dispatch(hide());
            },
          }));
        }}
      >
        Add password
      </Button>
    </Container>
  );
};

export default PasswordHeader;
