import React from "react";
import { Button } from "react-bootstrap";
import { Formik, Form } from "formik";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import ContainerForm from "./Accounts/ContainerForm";

// Components
import { TextField } from "./Accounts/TextField";
// Services
import { register } from "../Services/user.service";

const initialValues = {
  username: "",
  password: "",
  confirmPassword: "",
};

const validationObj = Yup.object({
  username: Yup.string().min(4, "Minimum 4 characters").required("Required"),
  password: Yup.string().min(4, "Minimum 4 characters").required("Required"),
  confirmPassword: Yup.string()
    .when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Both password need to be the same"
      ),
    })
    .required("Required")
    .min(4, "Minimum 4 characters"),
});

export const RegisterPage = ({ navigate }) => {
  return (
    <ContainerForm formText="Create an account">
      <Formik
        initialValues={initialValues}
        validationSchema={validationObj}
        enableReinitialize
        onSubmit={async (value) => {
          const res = await register(value);
          if (!res.status) {
            toast.error(`Registration Failed: ${res.response.data.message}`, {
              position: "top-center",
            });
          } else {
            navigate("/app");
          }
        }}
      >
        {(formik) => (
          <Form
            style={{ minHeight: "300px", marginTop: "70px" }}
            className="d-flex justify-content-around flex-column"
          >
            <TextField type="text" name="username" placeholder="Username" />
            <TextField type="password" name="password" placeholder="Password" />
            <TextField
              type="password"
              name="confirmPassword"
              placeholder="Repeat password"
            />
            <Button variant="primary" type="submit" className="w-100 mt-3">
              Register
            </Button>
          </Form>
        )}
      </Formik>

      <h5 className="text-center mt-4">
        Already have an account? <Link to="/login">Log in</Link>
      </h5>
      <ToastContainer />
    </ContainerForm>
  );
};

export default RegisterPage;
