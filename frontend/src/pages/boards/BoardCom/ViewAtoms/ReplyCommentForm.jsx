// import React, { useState } from "react";
// import { useRecoilValue } from "recoil";
// import { userState } from "../../../../recoil/userState";

// const ReplyCommentForm = ({ id, setReplyCommentList, prevComments }) => {
//   const [replyContent, setReplyContent] = useState("");
//   const userInfo = useRecoilValue(userState);
//   const userId = userInfo?.user?.id;
//   const userNickname = userInfo?.user?.nickname;

//   const handleReply = async () => {
//     try {
//       const response = await fetch(
//         `${process.env.REACT_APP_API_SERVER}/boards/${id}/comments?`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           credentials: "include",
//           body: JSON.stringify({
//             content: replyContent,
//             parentCommentId: null,
//           }),
//         }
//       );

//       if (response.ok) {
//         const newReply = await response.json();
//         setReplyCommentList((prevComments) => [...prevComments, newReply]);
//       } else {
//         console.error("Failed to post reply");
//       }
//     } catch (error) {
//       console.error("Error replying:", error);
//     }
//   };

//   return (
//     <div className="border p-5">
//       <div className="flex flex-row justify-between">
//         <div className="font-style: italic text-base">{userNickname}</div>
//       </div>
//       <textarea
//         type="text"
//         className="w-[800px]  p-[10px] resize-none rounded-md bg-neutral-100 text-black"
//         value={replyContent}
//         onChange={(e) => setReplyContent(e.target.value)}
//       />
//       <button onClick={handleReply}>대댓글 작성</button>
//     </div>
//   );
// };

// export default ReplyCommentForm;
