import React from "react";
import { ErrorMessage, useField } from "formik";
import { useState } from "react";
import { useRef } from "react";

export const TextField = ({ label, placeholder, ...props }) => {
  const [field, meta] = useField(props);
  const show_eye = useRef(null);
  const hide_eye = useRef(null);
  const [newType, setNewType] = useState("password");

  return (
    <>
      <div className="input-group">
        <span className="input-group-text" style={{ minWidth: "110px" }}>
          <h6 className=" text-center m-0 w-100">{placeholder}</h6>
        </span>
        <input
          className={`form-control shadow-none ${
            meta.touched && meta.error && "is-invalid"
          }`}
          {...field}
          {...props}
          type={props.type === "password" ? newType : "text"}
          autoComplete="off"
          style={{ height: "50px" }}
        />
        {props.type === "password" && (
          <span
            className="position-absolute border-0 d-flex align-items-center"
            onClick={() => {}}
            style={{ height: "100%", right: 0, zIndex: "100" }}
          >
            <i
              className="fas fa-eye btn"
              ref={show_eye}
              onClick={() => {
                setNewType("text");
                show_eye.current.classList.add("d-none");
                hide_eye.current.classList.remove("d-none");
              }}
            ></i>
            <i
              className="fas fa-eye-slash btn d-none"
              ref={hide_eye}
              onClick={() => {
                setNewType("password");
                show_eye.current.classList.remove("d-none");
                hide_eye.current.classList.add("d-none");
              }}
            ></i>
          </span>
        )}
      </div>
      <ErrorMessage component="div" name={field.name} className="error" />
    </>
  );
};
