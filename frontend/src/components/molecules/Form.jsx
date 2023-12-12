import React from "react";
import MUIInput from "../atoms/Input";
import MUIButton from "../atoms/Button";
import styled from "@emotion/styled";

// const StyledForm = styled.

const Form = () => {
  return (
    <form>
      <label htmlFor="userid">ID </label>
      <MUIInput type="text" placeholder={"Enter your ID..."} />
      <br />
      <label htmlFor="userpw">PW </label>
      <MUIInput type="password" placeholder={"Enter your PW..."} />
      <br />
      <MUIButton width={"600px"} bgColor={"#1976D2"}>
        <img /> <span>KGA</span>
      </MUIButton>
    </form>
  );
};

export default Form;
