import React from "react";
import styled from "styled-components";
import { Box } from "@mui/material";
import WriteButton from "./WriteButton";

const WritePageFoot = styled(Box)`
  width: 100%;
  height: 70px;
  background-color: #d6d6d6;
  padding: 10px;
  position: fixed;
  bottom: 0;
  left: 0;
`;

const WritePageBottom = () => {
  return (
    <>
      <WritePageFoot>
        <WriteButton />
      </WritePageFoot>
    </>
  );
};

export default WritePageBottom;
