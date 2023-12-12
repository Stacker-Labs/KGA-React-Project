import React from "react";
import MUIInput from "../atoms/Input";
import MUIButton from "../atoms/Button";
import { FormControl } from "@mui/material";
import styled from "@emotion/styled";

const StyledForm = styled(FormControl)`
  display: flex;
  flex-flow: column nowrap;
  row-gap: 5px;
`;

const Form = () => {
  return (
    <StyledForm>
      <MUIInput id="UserID" type="text" placeholder={"Enter your ID..."} />
      <br />
      <MUIInput
        id="Password"
        type="password"
        placeholder={"Enter your PW..."}
      />
      <br />
      <MUIButton customType={"local"}>
        <span>KGA</span>
      </MUIButton>
    </StyledForm>
  );
};

export default Form;
