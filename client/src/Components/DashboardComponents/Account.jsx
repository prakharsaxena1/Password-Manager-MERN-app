import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Stack, Button } from "react-bootstrap";
import { getUser, deleteUser } from "../../Services/app.service";

function Account() {
  const navigate = useNavigate();
  const { username } = getUser();
  return (
    <Container>
      <p className="display-1 text-center fst-italic mt-3">
        Account page for user: {username}
      </p>
      <Container
        className="mt-5"
        style={{ height: "700px", overflow: "hidden", overflowY: "auto" }}
      >
        <Stack gap={3} className="bg-white p-5 rounded">
          <div
            className="border px-4 py-3"
            style={{ backgroundColor: "#ffcccc" }}
          >
            <p className="display-6 fst-italic fw-bold">Danger section</p>
            <h5>
              This action is permanent and cannot be reversed, all the password
              associated with this account will be deleted as well
            </h5>
            <Button
              variant="danger"
              className="m-2"
              onClick={() => {
                deleteUser();
                navigate("/login");
              }}
            >
              Delete account
            </Button>
          </div>
        </Stack>
      </Container>
    </Container>
  );
}

export default Account;
