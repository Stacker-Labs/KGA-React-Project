import React from "react";
import { FaRegMessage } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import styled from "styled-components";
import Button from "@mui/material/Button";

const IconStyledWrap = styled(Box)`
  position: sticky;
  display: grid;
  top: 120px;
  border: 1px solid black;
  gap: 5;
  height: 70px;
  float: right;
`;

const TopBtn = styled(Button)`
  color: #7d89d1 !important;
`;

const IconCom = styled(FaRegMessage)`
  font-size: 50px;
`;
const IconHeart = styled(FaRegHeart)`
  font-size: 50px;
`;

const HandleScroll = () => {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    if (!window.scrollY) return;

    window.scrollTo({
      top: 500,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleShowButton = () => {
      if ((window.scrollY = window.innerHeight)) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleShowButton);
    return () => {
      window.removeEventListener("scroll", handleShowButton);
    };
  }, []);

  return (
    <IconStyledWrap>
      {showButton && (
        <TopBtn onClick={handleScroll}>
          <IconCom />
          <IconHeart />
        </TopBtn>
      )}
    </IconStyledWrap>
  );
};

export default HandleScroll;
