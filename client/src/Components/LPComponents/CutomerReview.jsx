import React from "react";
import { Col } from "react-bootstrap";

const CustomerReview = ({ user, children }) => {
  return (
    <Col md={4} className="mb-5 mb-md-0 bg-light py-5 rounded">
      <div className="d-flex justify-content-center mb-4">
        <img
          src={user.imgLink}
          alt="customer"
          className="rounded-circle shadow-1-strong"
          width="150"
          height="150"
        />
      </div>
      <h5 className="mb-3">{user.name}</h5>
      <h6 className="text-primary mb-3">{user.occupation}</h6>
      <p className="px-xl-3">
        <i className="fas fa-quote-left pe-2"></i> {user.message}{" "}
        <i className="fas fa-quote-right pe-2"></i>
      </p>
      {children}
    </Col>
  );
};

export default CustomerReview;
