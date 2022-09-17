import React, { useState } from "react";
import { Container } from "react-bootstrap";
import PasswordHeader from "./PasswordComponents/PasswordHeader";
import PasswordMain from "./PasswordComponents/PasswordMain";
import DisplayForm from "./PasswordComponents/DisplayForm";

function Passwords() {
  const [secrets, setSecrets] = useState([]);
  const [initialValues, setInitialValues] = useState({
    site_name: "",
    url: "",
    login: "",
    site_password: "",
  });
  const [control, setControl] = useState({});

  return (
    <Container
      fluid
      className="p-0"
      style={{
        maxHeight: "calc( 100vh - 56px)",
        minHeight: "calc( 100vh - 176px)",
        overflow: "hidden",
      }}
    >
      <PasswordHeader
        setControl={setControl}
        setInitialValues={setInitialValues}
        setSecrets={setSecrets}
      />
      <PasswordMain
        secrets={secrets}
        setSecrets={setSecrets}
        setControl={setControl}
        setInitialValues={setInitialValues}
      />
      <DisplayForm control={control} initialValues={initialValues} />
    </Container>
  );
}

export default Passwords;
