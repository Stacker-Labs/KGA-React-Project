import { atom } from "recoil";

export const inputDataState = atom({
  key: "inputDataState",
  default: {
    title: "",
    content: "",
  },
});
