import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Dropdown } from "react-bootstrap";
import {
  getSecrets,
  deleteSecret,
  getSecret,
  updateSecret,
} from "../../../Services/app.service";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { show, hide, showModal } from "./../../../actions";
import ModalSharePassword from "../ModalSharePassword";

const PasswordMain = ({
  secrets,
  setSecrets,
  setInitialValues,
  setControl,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchSecrets = async () => {
      const res = await getSecrets();
      const data = await res.data;
      setSecrets(data);
    };
    fetchSecrets();
  }, [setSecrets]);
  const [passID, setPassID] = useState("");
  let renderCards;
  if (secrets.length !== 0) {
    renderCards = secrets.map((data) => (
      <Col sm={12} md={6} lg={4} key={data.id} className="mb-5">
        <Card
          style={{ minWidth: "317px", overflowX: "hidden" }}
          className="d-lg-flex"
        >
          <Card.Body className="p-0">
            <Card.Title className="text-center text-white bg-dark mb-2 p-5">
              <a
                href={data.url}
                target="_blank"
                rel="noreferrer"
                className=" text-decoration-none text-white"
              >
                {data.site_name}
              </a>
            </Card.Title>
            <Card.Text className="d-flex justify-content-center mb-2">
              <span className="mx-2 fst-italic">Login: </span>
              <span className="fw-bold fst-italic">{data.login}</span>
            </Card.Text>
            <Card.Subtitle className="mb-3 text-muted text-center fst-italic">
              Last updated:{" "}
              <span>{new Date(data.updatedAt).toDateString()}</span>
            </Card.Subtitle>
          </Card.Body>
          <Dropdown style={{ position: "absolute", top: "0", right: "0" }}>
            <Dropdown.Toggle className="bg-dark shadow-none border-0"></Dropdown.Toggle>
            <Dropdown.Menu size="sm" title="n">
              <CopyToClipboard text={data.site_password}>
                <Dropdown.Item
                  onClick={() => {
                    toast("Password Copied", {
                      position: "top-center",
                    });
                  }}
                >
                  <i className="fa-solid fa-copy"></i> Copy password
                </Dropdown.Item>
              </CopyToClipboard>
              <Dropdown.Item
                onClick={() => {
                  setPassID(data.id);
                  dispatch(showModal());
                }}
              >
                <i className="fa-solid fa-share"></i> Share password
              </Dropdown.Item>
              <Dropdown.Item
                onClick={async () => {
                  const res = await getSecret(data.id);
                  setInitialValues((prev) => ({ ...res.data }));
                  setControl((prev) => ({
                    headingText: "Update password",
                    submitHandler: async (value) => {
                      const updateData = {
                        update: { ...value },
                      };
                      const res = await updateSecret(data.id, updateData);
                      setSecrets((old) =>
                        old.map((x) => (x.id === data.id ? res.data : x))
                      );
                      dispatch(hide());
                      toast.success("Password updated successfully", {
                        position: "top-center",
                      });
                    },
                  }));
                  dispatch(show());
                }}
              >
                <i className="fa-solid fa-pen-to-square"></i> Edit
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  deleteSecret(data.id);
                  setSecrets((prev) =>
                    prev.filter((secret) => secret.id !== data.id)
                  );
                  toast("Password Deleted", { position: "top-center" });
                }}
              >
                <i className="fa-solid fa-trash-can"></i> Delete
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Card>
      </Col>
    ));
  } else {
    renderCards = (
      <Container fluid>
        <p className="text-center display-1 m-5 p-5 fst-italic">
          No passwords present in the database
        </p>
      </Container>
    );
  }

  return (
    <Container
      fluid
      className="px-5 py-4"
      style={{
        minHeight: "calc( 100vh - 282.5px )",
        maxHeight: "calc( 100vh - 179px )",
        overflow: "hidden",
        overflowY: "auto",
      }}
    >
      <Row>{renderCards}</Row>
      <ModalSharePassword passID={passID} />
      <ToastContainer />
    </Container>
  );
};

export default PasswordMain;
