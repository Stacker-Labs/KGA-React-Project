import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import RegisterForm from "../../tw_components/molecules/RegisterForm";
import UserEditForm from "../../tw_components/molecules/UserEditForm";

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

const UserEdit = () => {
  return (
    <StyledContainer>
      <p className="font-bold py-5 text-2xl">Editing Your Account...</p>
      <UserEditForm />
    </StyledContainer>
  );
};

export default UserEdit;
