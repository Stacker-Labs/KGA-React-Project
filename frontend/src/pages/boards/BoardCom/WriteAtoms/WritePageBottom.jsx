import React from "react";
import styled from "styled-components";
import { Box } from "@mui/material";

// import MUIButton from "../../../../components/atoms/Button";

const WritePageFoot = styled(Box)`
  width: 100%;
  height: 40px;
  background-color: #d6d6d6;
  padding: 10px;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: end;
`;

const WritePageBottom = ({ handleSave }) => {
  return (
    <>
      <WritePageFoot>
        <button>저장</button>
      </WritePageFoot>
    </>
  );
};

export default WritePageBottom;
