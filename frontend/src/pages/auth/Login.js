import React, { useState } from "react";
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
import LoginForm from "../../tw_components/molecules/LoginForm";

const StyledContainer = styled.div`
  width: 40%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-flow: column nowrap;
  row-gap: 15px;
  align-items: center;
`;

const StyledFormContainer = styled.div`
  transition: opacity 0.5s ease, max-height 0.5s ease;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  max-height: ${(props) => (props.isVisible ? "300px" : "0")};
  overflow: hidden;
`;

const Login = () => {
  // form toggle
  const [isFormVisible, setIsFormVisible] = useState(false);
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

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <StyledContainer>
      <Link to={"/"}>
        <p className="font-logo text-5xl text-accent-blue">Stacker Labs</p>
      </Link>
      <p className="text-xl font-bold">Join Stacker Labs!</p>
      <p>Stacker Labs is an amazing community for web developers.</p>
      <hr />
      <div>
        <Button onClick={github} variant={"bright"} size={"social"}>
          <img width="40px" height="40px" src={github_icon}></img>
          <span>Continue with GitHub</span>
          <div></div>
        </Button>
        <Button onClick={google} variant={"bright"} size={"social"}>
          <img width="40px" height="40px" src={google_icon}></img>
          <span>Continue with Google</span>
          <div></div>
        </Button>
        <Button onClick={kakao} variant={"bright"} size={"social"}>
          <img width="40px" height="40px" src={kakao_icon}></img>
          <span>Continue with Kakao</span>
          <div></div>
        </Button>
        <Button onClick={toggleForm} variant={"bright"} size={"social"}>
          <span>Continue with ID</span>
        </Button>
      </div>
      <StyledFormContainer isVisible={isFormVisible}>
        {isFormVisible && <LoginForm />}
      </StyledFormContainer>

      <span>
        New to Stacker Labs?{" "}
        <Link to={"/auth/register"}>
          <u>Create Account!</u>
        </Link>
      </span>
    </StyledContainer>
  );
};

export default Login;
