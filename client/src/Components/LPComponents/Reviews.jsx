import React from "react";
import CustomerReview from "./CutomerReview";
import { Row, Container } from "react-bootstrap";

const Reviews = () => {
  const userReview = [
    {
      imgLink:
        "https://i.pinimg.com/736x/3d/4c/e4/3d4ce48c321af4fc8db48a67fb9cec16--grey-fifty-shades--shades.jpg",
      name: "Bailey Goodman",
      occupation: "Web Developer",
      message: "The ease of use of this app is just amazing",
    },
    {
      imgLink:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx",
      name: "Nelson Lindsey",
      occupation: "Graphic Designer",
      message: "This wonderful site saves a lot of time.",
    },
    {
      imgLink:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      name: "Kingsley Hampton",
      occupation: "Marketing Specialist",
      message: "I love this site. Its very useful and saves a lot of time.",
    },
  ];
  return (
    <Container fluid className="mt-5 w-75 p-5">
      <h3 className="mb-5 text-center display-3">
        Hear what our users have to say!!
      </h3>
      <Row className="text-center ">
        <CustomerReview user={userReview[0]}>
          <ul className="list-unstyled d-flex justify-content-center mb-0">
            <li>
              <i className="fas fa-star fa-sm text-warning"></i>
            </li>
            <li>
              <i className="fas fa-star fa-sm text-warning"></i>
            </li>
            <li>
              <i className="fas fa-star fa-sm text-warning"></i>
            </li>
            <li>
              <i className="fas fa-star fa-sm text-warning"></i>
            </li>
            <li>
              <i className="fas fa-star-half-alt fa-sm text-warning"></i>
            </li>
          </ul>
        </CustomerReview>
        <CustomerReview user={userReview[1]}>
          <ul className="list-unstyled d-flex justify-content-center mb-0">
            <li>
              <i className="fas fa-star fa-sm text-warning"></i>
            </li>
            <li>
              <i className="fas fa-star fa-sm text-warning"></i>
            </li>
            <li>
              <i className="fas fa-star fa-sm text-warning"></i>
            </li>
            <li>
              <i className="fas fa-star fa-sm text-warning"></i>
            </li>
            <li>
              <i className="fas fa-star fa-sm text-warning"></i>
            </li>
          </ul>
        </CustomerReview>
        <CustomerReview user={userReview[2]}>
          <ul className="list-unstyled d-flex justify-content-center mb-0">
            <li>
              <i className="fas fa-star fa-sm text-warning"></i>
            </li>
            <li>
              <i className="fas fa-star fa-sm text-warning"></i>
            </li>
            <li>
              <i className="fas fa-star fa-sm text-warning"></i>
            </li>
            <li>
              <i className="fas fa-star fa-sm text-warning"></i>
            </li>
            <li>
              <i className="far fa-star fa-sm text-warning"></i>
            </li>
          </ul>
        </CustomerReview>
      </Row>
    </Container>
  );
};

export default Reviews;
