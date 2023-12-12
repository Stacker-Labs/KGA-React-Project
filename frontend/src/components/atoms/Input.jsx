import React from "react";
import { Input } from "@mui/material";

const MUIInput = ({ type, placeholder }) => {
  return <Input type={type} placeholder={placeholder}></Input>;
};

export default MUIInput;
