import React from "react";
import { Offcanvas, Button } from "react-bootstrap";
import { Formik, Form } from "formik";
// Components
import { TextField } from "../../Accounts/TextField";
import GeneratePassword from "./GeneratePassword";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { hide } from "./../../../actions/";

const validationObj = Yup.object({
  site_name: Yup.string().min(4, "Minimum 4 characters").required("Required"),
  url: Yup.string().min(4, "Minimum 4 characters").required("Required"),
  login: Yup.string().min(4, "Minimum 4 characters").required("Required"),
  site_password: Yup.string().required("Required"),
});

function DisplayForm({ control, initialValues }) {
  const show = useSelector((state) => state.overlay);
  const dispatch = useDispatch();
  return (
    <Offcanvas
      show={show}
      onHide={() => {
        dispatch(hide());
      }}
      backdrop="static"
      placement="end"
      className="p-0"
      style={{ width: "70vh" }}
    >
      <Offcanvas.Header closeButton className="bg-secondary"></Offcanvas.Header>
      <Offcanvas.Body className="p-0">
        <h1 className="pb-5 pt-3 bg-secondary text-light text-center display-5 fst-italic">
          {control.headingText}
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationObj}
          enableReinitialize
          onSubmit={control.submitHandler}
        >
          {(formik) => (
            <Form className="d-flex justify-content-between flex-column p-3 m-3">
              <TextField type="text" name="site_name" placeholder="Site" />
              <TextField type="text" name="url" placeholder="Url" />
              <TextField type="text" name="login" placeholder="Login" />
              <TextField
                type="password"
                name="site_password"
                placeholder="Password"
              />
              <div className="d-flex justify-content-around">
                <Button
                  variant="primary"
                  type="submit"
                  className="mt-5 w-25"
                  onClick={() => {
                    dispatch(hide());
                  }}
                >
                  Save
                </Button>
                <Button
                  variant="dark"
                  type="reset"
                  className="mt-5 w-25"
                  onClick={() => {
                    dispatch(hide());
                  }}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          )}
        </Formik>
        <GeneratePassword />
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default DisplayForm;
