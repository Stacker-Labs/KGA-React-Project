import React from "react";

const ReplyCommentList = ({ id, replyCommentList }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  return (
    <div>
      {replyCommentList.map((replyComment) => (
        <div key={replyComment.id}>
          <p>{replyComment.content}</p>
        </div>
      ))}
    </div>
  );
};

export default ReplyCommentList;
