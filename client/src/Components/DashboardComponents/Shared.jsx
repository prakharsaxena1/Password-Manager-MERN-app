import React from "react";
import { Container, Button } from "react-bootstrap";
import { Formik, Form, ErrorMessage, useField } from "formik";
import * as Yup from "yup";
import { TextField } from "../Accounts/TextField";
import { receivePassword } from "../../Services/app.service";
import { useNavigate } from "react-router-dom";

const validationObj = Yup.object({
  sharedMessage: Yup.string()
    .min(4, "Minimum 4 characters")
    .required("Required"),
  sharedPassword: Yup.string()
    .min(4, "Minimum 4 characters")
    .required("Required"),
});

const initialValues = {
  sharedMessage: "",
  sharedPassword: "",
};
const MyTextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <textarea className="text-area" {...field} {...props} />
      {meta.touched && meta.error ? (
        <ErrorMessage component="div" name={field.name} className="error" />
      ) : null}
    </>
  );
};

function Shared() {
  let navigate = useNavigate();
  return (
    <Container fluid>
      <p className="display-1 text-center py-3 fst-italic">
        Add your shared password
      </p>
      <Container
        className="p-4"
        style={{
          background: "rgba( 255, 255, 255, 0.4 )",
          boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
          backdropFilter: "blur( 2.5px )",
          borderRadius: "10px",
        }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationObj}
          onSubmit={async (value) => {
            receivePassword(value.sharedMessage, value.sharedPassword);
            navigate("/app");
          }}
        >
          {(formik) => (
            <Form className="d-flex justify-content-around flex-column">
              <MyTextArea
                style={{ resize: "none", outline: "0" }}
                className="p-3 fs-3 border-0 mb-3"
                name="sharedMessage"
                cols="30"
                rows="5"
                placeholder="Add encrypted password..."
              />
              <TextField
                type="password"
                name="sharedPassword"
                placeholder="Shared password"
              />
              <Button variant="primary" type="submit" className="mt-3">
                Add shared pasword
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    </Container>
  );
}

export default Shared;
