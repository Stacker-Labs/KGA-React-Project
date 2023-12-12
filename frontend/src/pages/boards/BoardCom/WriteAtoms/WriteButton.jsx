import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Button } from "@mui/base/Button";
// import { inputDataState } from "./atoms";

export const WritePageBtn = styled(Button)`
  left: 90%;
  position: absolute;
  background-color: #0a0a23;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 15px;
  min-height: 30px;
  min-width: 120px;
  &:hover {
    background-color: #0056b3;
  }
`;

const WriteButton = () => {
  return <WritePageBtn>등록</WritePageBtn>;
};

export default WriteButton;
