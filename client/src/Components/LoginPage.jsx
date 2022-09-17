import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
// Components
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ContainerForm from "./Accounts/ContainerForm";
import { TextField } from "./Accounts/TextField";
import { ToastContainer, toast } from "react-toastify";
// Services
import { login } from "../Services/user.service";

const validationObj = Yup.object({
  username: Yup.string().min(4, "Minimum 4 characters").required("Required"),
  password: Yup.string().min(4, "Minimum 4 characters").required("Required"),
});
const initialValues = {
  username: "",
  password: "",
};

const LoginPage = ({ navigate }) => {
  return (
    <ContainerForm formText="Login to your account">
      <Formik
        initialValues={initialValues}
        validationSchema={validationObj}
        onSubmit={async (value) => {
          const res = await login(value);
          if (!res.status) {
            toast.error(`LOGIN FAILED: ${res.response.data.message}`, {
              position: "top-center",
            });
          } else {
            navigate("/app");
          }
        }}
      >
        {(formik) => (
          <Form
            style={{ minHeight: "250px", marginTop: "80px" }}
            className="d-flex justify-content-around flex-column"
          >
            <TextField type="text" name="username" placeholder="Username" />
            <TextField type="password" name="password" placeholder="Password" />

            <Button variant="primary" type="submit" className="w-100 mt-3">
              Sign in
            </Button>
          </Form>
        )}
      </Formik>
      <h5 className="text-center mt-4">
        New here? <Link to="/register">Register</Link>
      </h5>
      <ToastContainer />
    </ContainerForm>
  );
};

export default LoginPage;
