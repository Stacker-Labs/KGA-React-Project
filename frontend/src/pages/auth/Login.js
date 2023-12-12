import React from "react";
import Form from "../../components/molecules/Form";
import MUIButton from "../../components/atoms/Button";
import styled from "styled-components";

const StyledContainer = styled.div`
  width: 25%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-flow: column nowrap;
  row-gap: 10px;
`;

const Login = () => {
  return (
    <StyledContainer>
      <h1 style={{ textAlign: "center" }}>Logo</h1>
      <h2 style={{ textAlign: "center" }}>Join the Stacker Labs</h2>
      <p style={{ textAlign: "center" }}>
        Stacker Labs is a community of 1,200,000 amazing devs.
      </p>
      <div style={{ display: "flex", flexFlow: "column", rowGap: "10px" }}>
        <MUIButton customType={"social"}>LOGO Continue with GitHub</MUIButton>
        <MUIButton customType={"social"}>LOGO Continue with Google</MUIButton>
        <MUIButton customType={"social"}>LOGO Continue with Kakao</MUIButton>
        <MUIButton customType={"social"}>Continue with ID</MUIButton>
      </div>
      <Form style={{}} />
    </StyledContainer>
  );
};

export default Login;
