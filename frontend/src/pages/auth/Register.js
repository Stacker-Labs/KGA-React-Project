import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import RegisterForm from "../../tw_components/molecules/RegisterForm";

const StyledContainer = styled.div`
  width: 40%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-flow: column nowrap;
  row-gap: 20px;
  align-items: center;
  /* border: 1px solid black; */
  padding: 100px;
`;

const Register = () => {
  return (
    <StyledContainer>
      <Link to={"/"} className="font-logo text-5xl text-accent-blue ">
        Stacker-Labs
      </Link>
      <p className="text-xl font-bold">Create Your Account</p>
      <RegisterForm />
      <span>
        Already have an account?
        <Link to={"/auth"}>
          {" "}
          <u>Log In</u>
        </Link>
      </span>
    </StyledContainer>
  );
};

export default Register;
