import { atom, selector } from "recoil";

export const commentState = atom({
  key: "commentState",
  default: [],
});

export const commentsCountState = selector({
  key: "commentsCountState",
  get: ({ get }) => {
    const comments = get(commentState);
    return comments.length;
  },
});
