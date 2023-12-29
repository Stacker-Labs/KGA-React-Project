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

const LikeButton = ({ onClick, isLiked, likeCount }) => {
  const IconComponent = isLiked ? IconFullHeart : IconHeart;

  return (
    <HeartBox>
      <IconComponent onClick={onClick} />
      <span>{likeCount}</span>
    </HeartBox>
  );
};

const HandleScroll = ({ postId }) => {
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

  const handleLikeClick = async () => {
    if (userId) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_SERVER}/boards/${postId}/likes`,
          {
            method: isLiked ? "DELETE" : "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (response.ok) {
          const updatedLikeData = await response.json();
          setLikeCount(updatedLikeData.likes.length);
          setIsLiked(
            updatedLikeData.likes[0].some((like) => like.id === userId)
          );
          console.log(userId);
          console.log(updatedLikeData);
        } else {
          console.error("좋아요 상태 전환 실패");
        }
      } catch (error) {
        console.error("좋아요 상태 전환 중 에러:", error);
      }
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
        postId={postId}
        onClick={handleLikeClick}
        isLiked={isLiked}
        count={likeCount}
      />
    </IconStyledWrap>
  );
};

export default HandleScroll;
