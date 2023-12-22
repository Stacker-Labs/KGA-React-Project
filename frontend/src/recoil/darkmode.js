import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

export const darkModeState = atom({
  key: "darkModeState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});
