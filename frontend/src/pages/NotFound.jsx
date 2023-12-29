import React from "react";
import { Not_Found } from "../images";

const NotFound = () => {
  return (
    <div
      style={{ width: "inherit", background: "white", position: "relative" }}
    >
      <img src={Not_Found} style={{ margin: "auto", marginTop: "3rem" }} />
      <div
        style={{
          width: "100vw",
          height: "80px",
          position: "absolute",
          background: "white",
          bottom: "0px",
        }}
      ></div>
    </div>
  );
};

export default NotFound;
