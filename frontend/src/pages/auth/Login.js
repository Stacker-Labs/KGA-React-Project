import React from "react";
import styled from "styled-components";
import Button from "../../tw_components/atoms/Buttons";
import Input from "../../tw_components/atoms/Inputs";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/User";

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
`;

const Login = () => {
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
      <h1 className="font-logo text-5xl text-accent-blue">Stacker Labs</h1>
      <h2>Join Stacker Labs!</h2>
      <p>Stacker Labs is a community of 1,200,000 amazing devs.</p>
      <div>
        <Button onClick={github} variant={"bright"} size={"social"}>
          <div>LOGO</div> <span>Continue with GitHub</span>
        </Button>
        <Button onClick={google} variant={"bright"} size={"social"}>
          <div>LOGO</div> <span>Continue with Google</span>
        </Button>
        <Button onClick={kakao} variant={"bright"} size={"social"}>
          <div>LOGO</div> <span>Continue with Kakao</span>
        </Button>
        <Button variant={"bright"} size={"social"}>
          <span>Continue with ID</span>
        </Button>
      </div>
      <div>
        <span className="text-black text-lg">
          <hr /> OR <hr />
        </span>
      </div>
      <form className="flex flex-col items-center">
        <Input type="text" placeholder="ID" />
        <br />
        <Input type="password" placeholder="Password" />
        <Button variant={"blue"} size={"sign"}>
          <span className="text-white">Sign In</span>
        </Button>
      </form>
      <p>
        New to Stacker Labs? <u>Create Account</u>
      </p>
    </StyledContainer>
  );
};

export default Login;
