import React from "react";

function DisplayText(props) {
  const classes = "m-0 text-center py-3 " + props.className;
  return (
    <h5 style={{ width: "240px" }} className={classes}>
      {props.children}
    </h5>
  );
}

export default DisplayText;
