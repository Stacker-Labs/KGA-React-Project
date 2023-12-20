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

  gap: 5;
  height: 100%;
  float: right;
`;
const HeartBox = styled(Box)`
  margin-left: 5px;
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

  const userToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNhbmduYW1lIiwiaWF0IjoxNzAzMDM1Njk4LCJleHAiOjE3MDMwMzkyOTh9.RAnl6UNjoN8WnDFN3Z6tSz0abkBRJ6eZBNxZd_ldJNQ";

  const handleScroll = () => {
    if (!window.scrollY) return;

    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };
  const handleHeartClick = () => {
    if (userToken) {
      setClicked((prevClicked) => !prevClicked);
      setCount((prevCount) => (clicked ? prevCount - 1 : prevCount + 1));
    } else {
      alert("로그인이 필요합니다.");
    }
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
      <HeartBox>
        {clicked ? (
          <IconFullHeart onClick={handleHeartClick} />
        ) : (
          <IconHeart onClick={handleHeartClick} />
        )}
        <span>{count}</span>
      </HeartBox>
    </IconStyledWrap>
  );
};

export default HandleScroll;
