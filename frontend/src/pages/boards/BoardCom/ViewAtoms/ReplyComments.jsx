import React, { useState } from "react";

const ReplyComments = ({ comments, setComments, index, replyIndex }) => {
  const [replyText, setReplyText] = useState("");

  const handleReplySubmit = () => {
    if (replyText.trim() === "") return;

    const updatedComments = [...comments];
    updatedComments[index] = [...(updatedComments[index] || []), replyText];
    setComments(updatedComments);

    // 상태 초기화
    setReplyText("");
  };

  return (
    <div>
      <div>
        {comments[index]?.map((reply, idx) => (
          <div key={idx}>{reply}</div>
        ))}
      </div>
      {replyIndex === index && (
        <div>
          <textarea
            placeholder="대댓글을 입력하세요..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <button onClick={handleReplySubmit}>등록</button>
        </div>
      )}
    </div>
  );
};

export default ReplyComments;
