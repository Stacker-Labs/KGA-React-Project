import React, { useState, useEffect, useRef } from "react";
import HandleScroll from "./ViewAtoms/HandleScroll";
import { useParams, Link, useNavigate } from "react-router-dom";
import CommentList from "./ViewAtoms/CommentsList";
import CommentForm from "./ViewAtoms/CommentForm";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/userState";
import { cn } from "../../../utils/cn";
import { No_Profile } from "../../../images";
import Button from "../../../tw_components/atoms/Buttons";

const View = () => {
  const [viewContent, setViewContent] = useState({});
  const [commentList, setCommentList] = useState([]);
  const [commentsLength, setCommentsLength] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [page, setPage] = useState(1);

  // const [loading, setLoading] = useState(true);
  const params = useParams();
  const userInfo = useRecoilValue(userState);
  const userId = userInfo?.user?.id || "";
  const hasPermission = userId === viewContent.user?.id;
  const viewContentRef = useRef();
  const navigate = useNavigate();

  // const Token = process.env.REACT_APP_TOKEN;
  // //  Authorization: `Bearer ${Token}`,
  // console.log(Token);

  useEffect(() => {
    const getBoard = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER}/boards/${params.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const result = await response.json();

      // console.log("result@@", result);
      const likeBtn = result.likes.findIndex((item) => item.id === userId);

      setViewContent(result);
      if (likeBtn !== -1) {
        setIsLiked(true);
      }

      const commentResponse = await fetch(
        `${process.env.REACT_APP_API_SERVER}/boards/${params.id}/${page}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const commentResult = await commentResponse.json();

      setPage(commentResult.nextPage);
      setCommentsLength(result.commentLength);
      setCommentList(commentResult.boardComments[0]);
    };

    if (!viewContent.title) {
      getBoard();
    } else {
      viewContentRef.current.innerHTML = viewContent.content;
    }
  }, [viewContent, commentList, commentsLength]);

  const constructEditURL = () => {
    const queryParams = new URLSearchParams();
    queryParams.set("title", viewContent.title);
    queryParams.set("content", viewContent.content);
    const tagsString = viewContent.tags.map((tag) => tag.tag).join(",");
    queryParams.set("tags", tagsString);
    const editURL = `/boards/${params.id}/edit?${queryParams.toString()}`;
    return editURL;
  };

  const handleDelete = async () => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete?");
      if (!confirmed) return;
      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER}/boards/${params.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        alert("Post has been deleted.");
        navigate("/");
      } else {
        // 오류 처리
        console.error("Failed to delete");
      }
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  const formattedDate = new Date(viewContent.createdAt).toLocaleDateString(
    "ko-KR",

    {
      timeZone: "Asia/Seoul",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }
  );

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);

  //   return () => clearTimeout(timer);
  // }, []);
  console.log(viewContent);

  return (
    <div
      className={cn(
        "flex flex-col w-3/4 mx-auto h-screen px-40 gap-5 py-8"
        // darkMode ? "dark" : ""
      )}
    >
      <div className="w-full flex flex-row justify-between items-center">
        <div className="text-4xl">{viewContent.title}</div>
        <HandleScroll
          userId={userId}
          postId={params.id}
          isLiked={isLiked}
          setIsLiked={setIsLiked}
        />
      </div>

      <div className="flex flex-row gap-5 text-xl">
        {viewContent.tags?.map((tag, idx) => (
          <Link
            key={`tag-${idx}`}
            className="p-1 hover:border rounded-md border-accent-blue"
            to={`/tags/${tag.tag}`}
          >
            # {tag.tag}
          </Link>
        ))}
      </div>

      <div className="flex flex-row border-b py-3">
        <Link to={`/users/${viewContent?.user?.id}`}>
          <img
            src={viewContent?.user?.image || No_Profile}
            className="w-[50px] h-[50px] rounded-3xl mobile:w-[45px] mobile:h-[45px]"
            alt=""
          />
        </Link>
        <div className="pl-4 w-full">
          <p className="text-xl mobile:text-base">
            <Link to={`/users/${viewContent?.user?.id}`}>
              {viewContent?.user?.nickname}
            </Link>
          </p>
          <div className="flex flex-row w-full justify-between">
            <span className="mobile:text-base">{formattedDate}</span>
            <span>{viewContent?.views?.length} Unique Views</span>
          </div>
        </div>
      </div>

      <div ref={viewContentRef} className="p-4 text-lg"></div>
      {hasPermission && (
        <div className="flex flex-row gap-3 m-auto py-5">
          <Link to={constructEditURL()}>
            <Button variant={"blue"} size={"md"}>
              Edit
            </Button>
            {/* <MUIButton customType="social">수정</MUIButton> */}
          </Link>
          <div onClick={handleDelete}>
            <Button variant={"blue"} size={"md"}>
              Delete
            </Button>
            {/* <MUIButton customType="local">삭제</MUIButton> */}
          </div>
        </div>
      )}
      <div className="my-5 text-xl">댓글 {commentsLength}</div>
      <CommentForm
        id={params.id}
        setCommentList={setCommentList}
        commentList={commentList}
        setCommentsLength={setCommentsLength}
        commentsLength={commentsLength}
      />
      <CommentList
        id={params.id}
        commentList={commentList}
        page={page}
        setCommentList={setCommentList}
      />
    </div>
  );
};

export default View;
