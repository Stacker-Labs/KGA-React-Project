import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { userMenuState } from "../recoil/userMenuState";
import { useLocation } from "react-router-dom";

export const useResetMenu = () => {
  const setMenuOpen = useSetRecoilState(userMenuState);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location, setMenuOpen]);
};
