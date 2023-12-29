import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../../../recoil/userState";
import CommentList from "../ViewAtoms/CommentsList";
import CommentForm from "../ViewAtoms/CommentForm";
import { useParams } from "react-router-dom";

// const Token = process.env.REACT_APP_TOKEN;
//    Authorization: `Bearer ${Token}`,
const Comment = ({ comment, id, setCommentList }) => {
  const [updateMode, setUpdateMode] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [replyMode, setReplyMode] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [replyCommentList, setReplyCommentList] = useState([]);
  const userInfo = useRecoilValue(userState);
  const userId = userInfo?.user?.id;
  const params = useParams();

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

  const handleUpdateMode = () => {
    setUpdateMode(!updateMode);
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

  const handleReplyMode = () => {
    setReplyMode(!replyMode);
  };
  useEffect(() => {
    const handleReply = async () => {
      try {
        await fetch(
          `${process.env.REACT_APP_API_SERVER}/comments/${params.id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ content: replyContent }),
          }
        );

        const commentResponse = await fetch(
          `${process.env.REACT_APP_API_SERVER}/boards/${params.id}/1`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const commentResult = await commentResponse.json();
        setReplyCommentList(commentResult.boardComments[0]);
        setReplyMode(false);
        setReplyContent("");
      } catch (error) {
        console.error("Error replying:", error);
      }
    };
    handleReply();
  }, [replyCommentList]);

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
          <div>
            <CommentForm
              id={params.id}
              replyCommentList={replyCommentList}
              setReplyCommentList={setReplyCommentList}
            />
            <CommentList
              id={params.id}
              replyCommentList={replyCommentList}
              setReplyCommentList={setReplyCommentList}
            />
          </div>
        ) : (
          <button onClick={handleReplyMode}>대댓글</button>
        )}
      </div>
    </div>
  );
};

export default Comment;
