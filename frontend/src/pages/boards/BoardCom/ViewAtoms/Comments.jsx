import React, { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons";
const Comments = ({ id }) => {
  const [comments, setComments] = useState([]);
  const [replyText, setReplyText] = useState("");
  const [replyIndex, setReplyIndex] = useState(null);
  const [showReply, setShowReply] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editingReplyIndex, setEditingReplyIndex] = useState(null);
  const [replyInputDisabled, setReplyInputDisabled] = useState(false);

  const addComment = (newComment) => {
    setComments([...comments, { text: newComment, replies: [] }]);
  };

  const addReply = (index) => {
    if (replyText.trim() === "" || editingReplyIndex !== null) return;
    const updatedComments = [...comments];
    updatedComments[index].replies.push(replyText);
    setComments(updatedComments);
    setReplyText("");
    setReplyIndex(null);
  };

  const toggleReply = (index) => {
    if (replyIndex === index) {
      setShowReply(false);
      setReplyIndex(null);
    } else {
      setReplyIndex(index);
      setShowReply(true);
      setEditIndex(null);
    }
  };

  // const toggleEditReply = (index) => {
  //   setEditingReplyIndex((prevIndex) => (prevIndex === index ? null : index));
  //   setShowReply(true);
  // };

  // useEffect(() => {
  //   setReplyInputDisabled(editingReplyIndex !== null);
  // }, [editingReplyIndex]);

  const deleteComment = (index) => {
    const updatedComments = [...comments];
    updatedComments.splice(index, 1);
    setComments(updatedComments);
  };

  const deleteReply = (commentIndex, replyIndex) => {
    const updatedComments = [...comments];
    updatedComments[commentIndex].replies.splice(replyIndex, 1);
    setComments(updatedComments);
  };

  const countReplies = (index) => {
    return comments[index].replies.length;
  };

  const editComment = (index) => {
    setEditIndex(index);
    setReplyIndex(null);
  };

  const saveEditedComment = (index) => {
    const updatedComments = [...comments];
    updatedComments[index].text = replyText;
    setComments(updatedComments);
    setEditIndex(null);
  };

  return (
    <div>
      <h2>댓글 목록</h2>
      <CommentForm addComment={addComment} id={id} comments={comments} />
      <ul>
        {comments.map((comment, index) => (
          <li key={index} className="border-b-2 my-[50px]">
            <div className="mb-10 flex flex-row justify-between">
              <p>닉네임</p>
              <div>
                <div className="gap-y-2">
                  <button
                    onClick={() => deleteComment(index)}
                    className="border-4 p-[5px] bg-slate-600 text-white text-xs "
                  >
                    삭제
                  </button>
                  {editIndex === index ? (
                    <button
                      onClick={() => saveEditedComment(index)}
                      className="border-4 p-[5px] text-xs"
                    >
                      저장
                    </button>
                  ) : (
                    <button
                      onClick={() => editComment(index)}
                      className="border-4 p-[5px] text-xs"
                    >
                      수정
                    </button>
                  )}
                </div>
              </div>
            </div>
            {editIndex === index ? (
              <div className="my-[10px]">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="w-[800px] p-[10px] resize-none rounded-md bg-neutral-100"
                />
              </div>
            ) : (
              <div className="my-[10px]">{comment.text}</div>
            )}
            <div className="flex flex-row">
              <button onClick={() => toggleReply(index)}>댓글</button>
              <p>{countReplies(index)}</p>
            </div>
            {replyIndex === index && (
              <div>
                <div className="flex flex-row">
                  <textarea
                    className="w-[800px]  p-[10px] resize-none rounded-md bg-neutral-100"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    disabled={!!editIndex} // 수정 중인 상태일 때 textarea 비활성화
                  />
                  <button
                    className="bg-sky-600 p-[15px] rounded-md"
                    onClick={() => addReply(index)}
                    disabled={!!editIndex} // 수정 중인 상태일 때 버튼 비활성화
                  >
                    <p className="text-white mx-auto">등록</p>
                  </button>
                </div>
                {comment.replies.map((reply, idx) => (
                  <div key={idx} className="p-[10px]">
                    <div className="flex flex-row">
                      <FontAwesomeIcon
                        icon={faReply}
                        className="transform rotate-180"
                      />
                      <div className="flex flex-row justify-between  w-[100%]">
                        <p>닉네임</p>
                        <button onClick={() => deleteReply(index, replyIndex)}>
                          삭제
                        </button>
                      </div>
                    </div>

                    <div className="bg-slate-50">{reply}</div>
                  </div>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
