import React from "react";
import { Input } from "@mui/material";

const MUIInput = ({ id, type, placeholder }) => {
  return (
    <>
      <label htmlFor={id}>{id} </label>
      <Input id={id} type={type} placeholder={placeholder}></Input>
    </>
  );
};

export default MUIInput;
