import { useSetRecoilState } from "recoil";
import { commentState } from "./commentsState";

export const useAddComment = () => {
  const setComments = useSetRecoilState(commentState);

  const addComment = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  return addComment;
};
