import React, { useState, useEffect } from "react";
import { FaRegMessage } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { Box } from "@mui/material";
import styled from "styled-components";
import Button from "@mui/material/Button";
import { useRecoilValue } from "recoil";
import { userState } from "../../../../recoil/userState";

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
const ScrollToTopButton = ({ onClick }) => {
  return (
    <TopBtn onClick={onClick}>
      <IconCom />
    </TopBtn>
  );
};

const LikeButton = ({ onClick, isLiked, count }) => {
  const IconComponent = isLiked ? IconFullHeart : IconHeart;

  return (
    <HeartBox>
      <IconComponent onClick={onClick} />
      <span>{count}</span>
    </HeartBox>
  );
};

const HandleScroll = () => {
  const [showButton, setShowButton] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const userInfo = useRecoilValue(userState);
  const userId = userInfo?.user?.id || "";

  const handleScroll = () => {
    if (window.scrollY !== 0) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handleLikeClick = () => {
    if (userId) {
      setIsLiked((prev) => !prev);
      setLikeCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));
    } else {
      alert("로그인이 필요합니다.");
    }
  };

  useEffect(() => {
    const handleShowButton = () => {
      setShowButton(window.scrollY > window.innerHeight);
    };

    window.addEventListener("scroll", handleShowButton);
    return () => {
      window.removeEventListener("scroll", handleShowButton);
    };
  }, []);

  return (
    <IconStyledWrap>
      {showButton && <ScrollToTopButton onClick={handleScroll} />}
      <LikeButton
        onClick={handleLikeClick}
        isLiked={isLiked}
        count={likeCount}
      />
    </IconStyledWrap>
  );
};

export default HandleScroll;
