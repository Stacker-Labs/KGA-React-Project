import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../../../recoil/userState";
import CommentList from "../ViewAtoms/CommentsList";
import CommentForm from "../ViewAtoms/CommentForm";
// import { useParams } from "react-router-dom";

// const Token = process.env.REACT_APP_TOKEN;
//    Authorization: `Bearer ${Token}`,
const Comment = ({ comment, id, setCommentList, page }) => {
  const [updateMode, setUpdateMode] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [replyMode, setReplyMode] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [replyCommentList, setReplyCommentList] = useState([]);
  // const [page, setPage] = useState(1);
  const userInfo = useRecoilValue(userState);
  const userId = userInfo?.user?.id;
  // const params = useParams();

  const handleUpdateMode = () => {
    setUpdateMode(!updateMode);
  };
  const handleReplyMode = () => {
    setReplyMode(!replyMode);
  };

  const handleDelete = async (commentId) => {
    try {
      await fetch(`${process.env.REACT_APP_API_SERVER}/comments/${commentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const commentResponse = await fetch(
        `${process.env.REACT_APP_API_SERVER}/boards/${id}/1`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const commentResult = await commentResponse.json();
      console.log(commentResult.boardComments[0]);
      setCommentList(commentResult.boardComments[0]);
    } catch (error) {
      console.error("댓글 삭제 중 에러:", error);
    }
  };

  const handleUpdate = async (commentId) => {
    try {
      await fetch(`${process.env.REACT_APP_API_SERVER}/comments/${commentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ content: editedContent }),
      });
      const commentUpdateResponse = await fetch(
        `${process.env.REACT_APP_API_SERVER}/boards/${id}/1`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const updatedCommentResult = await commentUpdateResponse.json();
      setCommentList(updatedCommentResult.boardComments[0]);
      setUpdateMode(false);
    } catch (error) {
      console.error("댓글 수정중 에러:", error);
    }
  };
  useEffect(() => {
    const handleReply = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_SERVER}/boards/${id}/comments`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ content: replyContent }),
          }
        );

        if (response.ok) {
          const commentResponse = await fetch(
            `${process.env.REACT_APP_API_SERVER}/boards/${id}/${page}`,
            {
              method: "GET",
              credentials: "include",
            }
          );

          const commentResult = await commentResponse.json();

          setReplyCommentList(commentResult.boardComments[0]);
          setReplyMode(false);
          setReplyContent("");
        } else {
          console.error("Failed to post reply");
        }
      } catch (error) {
        console.error("Error replying:", error);
      }
    };
    if (id) {
      handleReply();
    }
  }, [
    replyContent,
    id,
    page,
    setReplyCommentList,
    setReplyMode,
    setReplyContent,
  ]);

  return (
    <div className="border-y-2 p-[10px]">
      <div className="mb-5 flex flex-row justify-between">
        <p className="font-style: italic text-base">
          {comment?.user?.nickname}
        </p>
        {!comment.deleted && userId === comment.user.id && (
          <div className="gap-2">
            <button
              className="border-4 p-[5px] bg-slate-600 text-white text-xs"
              onClick={() => handleDelete(comment.id)}
            >
              삭제
            </button>
            {updateMode ? (
              <button
                className="border-4 p-[5px] text-xs"
                onClick={() => handleUpdate(comment.id)}
              >
                저장
              </button>
            ) : (
              <button
                className="border-4 p-[5px] text-xs"
                onClick={handleUpdateMode}
              >
                수정
              </button>
            )}
          </div>
        )}
      </div>
      {updateMode ? (
        <textarea
          className="w-[90%] resize-none"
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
        />
      ) : (
        <div className="p-[5px]"> {comment.content}</div>
      )}
      <div className="border-y-2 p-[10px]">
        {replyMode ? (
          <div className="w-[90%] h-[100%] my-[5px] flex flex-col ">
            <button onClick={handleReplyMode}>대댓글 닫기</button>
            <div className="my-[5px]">
              <CommentForm
                id={id}
                replyCommentList={replyCommentList}
                setReplyCommentList={setReplyCommentList}
              />
              <CommentList
                id={id}
                replyCommentList={replyCommentList}
                setReplyCommentList={setReplyCommentList}
                page={page}
              />
            </div>
          </div>
        ) : (
          <button onClick={handleReplyMode}>대댓글</button>
        )}
      </div>
    </div>
  );
};

export default Comment;
