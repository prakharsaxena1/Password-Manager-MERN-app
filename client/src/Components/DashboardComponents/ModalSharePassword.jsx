import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify"
import { hideModal } from "./../../actions";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField } from "./../Accounts/TextField";
import { sharePassword } from "../../Services/app.service";

const validationObj = Yup.object({
  sharedEmail: Yup.string()
    .email("Must be a valid email")
    .max(100)
    .required("Email is required"),
  sharedPassword: Yup.string()
    .min(4, "Minimum 4 characters")
    .required("Required"),
});

const initialValues = {
  sharedEmail: "",
  sharedPassword: "",
};

const ModalSharePassword = ({ passID }) => {
  const modalShow = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(hideModal());
  };
  return (
    <Modal
      show={modalShow}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Share password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValues}
          validationSchema={validationObj}
          enableReinitialize
          onSubmit={(val) => {
           sharePassword(passID, val.sharedEmail, val.sharedPassword);
            toast.success("Password Shared Successfully",{position: "top-center"})
            dispatch(hideModal());
          }}
        >
          {(formik) => (
            <Form className="p-2">
              <TextField type="email" name="sharedEmail" placeholder="Email" />
              <TextField
                type="password"
                name="sharedPassword"
                placeholder="Password"
              />
              <Button
                variant="secondary"
                className="my-3 me-4"
                onClick={handleClose}
              >
                Close
              </Button>
              <Button variant="primary" className="my-3" type="submit">
                Share
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
      <ToastContainer />
    </Modal>
    

  );
};

export default ModalSharePassword;
