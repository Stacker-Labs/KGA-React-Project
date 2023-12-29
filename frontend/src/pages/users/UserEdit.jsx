import React from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import UserEditForm from "../../tw_components/molecules/UserEditForm";

const StyledContainer = styled.div`
  width: 40%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -45%);
  display: flex;
  flex-flow: column nowrap;
  row-gap: 20px;
  align-items: center;
  padding: 100px;
`;

const UserEdit = () => {
  const { id } = useParams();
  return (
    <StyledContainer>
      <p className="font-bold py-5 text-2xl">Editing Your Account...</p>
      <UserEditForm userid={id} />
    </StyledContainer>
  );
};

export default UserEdit;
