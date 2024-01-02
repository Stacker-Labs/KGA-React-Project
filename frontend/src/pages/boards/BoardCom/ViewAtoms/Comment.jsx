import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../../../recoil/userState";
import ReplyCommentForm from "./ReplyCommentForm";
import ReplyCommentList from "./ReplyCommentList";
import { No_Profile } from "../../../../images";
import Button from "../../../../tw_components/atoms/Buttons";

const Comment = ({ comment, id, setCommentList }) => {
  const [updateMode, setUpdateMode] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [replyMode, setReplyMode] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [replyCommentList, setReplyCommentList] = useState(comment.comments);
  const [replyCommentLength, setReplyCommentLength] = useState(
    comment.comments.length
  );

  // const [page, setPage] = useState(1);
  const userInfo = useRecoilValue(userState);
  const userId = userInfo?.user?.id;

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

  return (
    <div className="border rounded-md p-5 my-3">
      <div className="mb-5 flex flex-row justify-between items-center px-5">
        <div className="flex flex-row items-center justify-around w-[15%]">
          <img
            src={comment?.user?.image || No_Profile}
            alt=""
            className="w-[50px] h-[50px] rounded-3xl"
          />
          <p className="italic text-xl">{comment?.user?.nickname}</p>
        </div>

        {!comment?.deleted && userId === comment?.user?.id && (
          <div className="gap-5 flex flex-row">
            <Button
              variant={"blue"}
              size={"md"}
              className=""
              onClick={() => handleDelete(comment.id)}
            >
              Delete
            </Button>
            {updateMode ? (
              <Button
                variant={"blue"}
                size={"md"}
                className=""
                onClick={() => handleUpdate(comment.id)}
              >
                Save
              </Button>
            ) : (
              <Button
                variant={"blue"}
                size={"md"}
                className=""
                onClick={handleUpdateMode}
              >
                Edit
              </Button>
            )}
          </div>
        )}
      </div>

      {updateMode ? (
        <div className="w-[95%] mx-auto">
          <textarea
            className="w-full resize-none bg-transparent border p-2"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
        </div>
      ) : (
        <div className="px-3 py-5 ml-4"> {comment.content}</div>
      )}

      {
        <div className="w-[95%] mx-auto">
          {replyMode ? (
            <div className="">
              <button onClick={handleReplyMode} className="p-3">
                ✖️
              </button>
              <div className="my-[5px]">
                <ReplyCommentList
                  replyCommentList={replyCommentList}
                  setReplyCommentList={setReplyCommentList}
                />
                <ReplyCommentForm
                  id={id}
                  replyContent={replyContent}
                  parentCommentId={comment.id}
                  onChangeReply={(e) => setReplyContent(e.target.value)}
                  replyCommentList={replyCommentList}
                  setReplyCommentList={setReplyCommentList}
                  setReplyCommentLength={setReplyCommentLength}
                />
              </div>
            </div>
          ) : (
            <button onClick={handleReplyMode}>
              댓글({replyCommentLength})
            </button>
          )}
        </div>
      }
    </div>
  );
};

export default Comment;
