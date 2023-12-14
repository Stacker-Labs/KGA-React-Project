import React from "react";
import { FaRegMessage } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
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
  height: 100%;
  float: right;
`;

const TopBtn = styled(Button)`
  color: #7d89d1 !important;
`;

const IconCom = styled(FaRegMessage)`
  font-size: 50px;
  cursor: pointer;
`;
const IconHeart = styled(FaRegHeart)`
  font-size: 50px;
`;
const IconFullHeart = styled(FaHeart)`
  font-size: 50px;
  color: red;
  cursor: pointer;
`;

const HandleScroll = () => {
  const [showButton, setShowButton] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [count, setCount] = useState(0);
  const handleScroll = () => {
    if (!window.scrollY) return;

    window.scrollTo({
      top: 500,
      behavior: "smooth",
    });
  };
  const handleHeartClick = () => {
    setClicked((prevClicked) => !prevClicked);
    setCount((prevCount) => (clicked ? prevCount - 1 : prevCount + 1));
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
        </TopBtn>
      )}
      {clicked ? (
        <IconFullHeart onClick={handleHeartClick} />
      ) : (
        <IconHeart onClick={handleHeartClick} />
      )}
      <span>{count}</span>
    </IconStyledWrap>
  );
};

export default HandleScroll;
