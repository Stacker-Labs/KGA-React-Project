import React from "react";
import styled from "styled-components";
import Button from "../../tw_components/atoms/Buttons";
import Input from "../../tw_components/atoms/Inputs";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/User";
import { Link } from "react-router-dom";
import {
  github_icon,
  kakao_icon,
  google_icon,
} from "../../images/login_assets";

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

      <form
        encType="multipart/form-data"
        className="flex flex-col gap-y-3 items-center"
      >
        <label
          htmlFor="image"
          className="self-start ml-4 text-lg text-gray-700"
        >
          Profile Picture
        </label>
        <Input type="file" name="image" id="image" />
        <Input type="text" placeholder="ID" />
        <Input type="text" placeholder="Password" />
        <Input type="text" placeholder="Confirm your password" />
        <Button variant={"blue"} size={"sign"}>
          <span className="text-white">Register</span>
        </Button>
      </form>
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
