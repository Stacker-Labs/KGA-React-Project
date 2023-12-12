import React from "react";
import MUIButton from "../atoms/Button";
import { ButtonGroup } from "@mui/material";

const SocialButtons = () => {
  return (
    <div>
      <MUIButton customType={"social"}>LOGO Continue with GitHub</MUIButton>
      <MUIButton customType={"social"}>LOGO Continue with Google</MUIButton>
      <MUIButton customType={"social"}>LOGO Continue with Kakao</MUIButton>
      <MUIButton customType={"social"}>Continue with ID</MUIButton>
    </div>
  );
};

export default SocialButtons;
