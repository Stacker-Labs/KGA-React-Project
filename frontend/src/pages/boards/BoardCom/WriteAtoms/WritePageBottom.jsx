import React from "react";
import styled from "styled-components";
import { Box } from "@mui/material";

// import MUIButton from "../../../../components/atoms/Button";

const WritePageFoot = styled(Box)`
  width: 100%;
  height: 40px;
  background-color: #1976d2;
  padding: 10px;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: end;
`;

const WritePageBottom = ({ handleSave }) => {
  const onClickHandler = () => {
    handleSave();
  };
  return (
    <>
      <WritePageFoot>
        <button onClick={onClickHandler}>저장</button>
      </WritePageFoot>
    </>
  );
};

export default WritePageBottom;
