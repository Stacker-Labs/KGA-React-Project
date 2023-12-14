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
  row-gap: 10px;
  align-items: center;
  border: 1px solid black;
  padding: 100px;
`;

const Register = () => {
  // accessing to global state
  const user = useRecoilValue(userState);
  console.log(user);
  // onclick handler for GitHub
  const github = () => {
    window.open(
      "https://github.com/login/oauth/authorize" +
        `?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}`,
      "_self"
    );
  };
  // onclick handler for Google
  const google = () => {
    window.open(
      "https://accounts.google.com/o/oauth2/v2/auth" +
        `?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}` +
        `&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT}` +
        "&response_type=token" +
        "&scope=https://www.googleapis.com/auth/userinfo.email",
      "_self"
    );
  };

  // onclick handler for Kakao
  const kakao = () => {
    window.open(
      "https://kauth.kakao.com/oauth/authorize" +
        `?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}` +
        `&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT}` +
        "&response_type=code",
      "_self"
    );
  };

  return (
    <StyledContainer>
      <p className="text-xl font-bold">Create Your Account</p>

      <form
        encType="multipart/form-data"
        className="flex flex-col items-center"
      >
        <Input type="file" name="image" />
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
