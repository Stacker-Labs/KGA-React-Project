import React from "react";
import { useRecoilState } from "recoil";
import { darkModeState } from "../../recoil/darkmode";
import { FaMoon, FaSun } from "react-icons/fa6";

const DarkmodeBtn = () => {
  const [darkMode, setDarkMode] = useRecoilState(darkModeState);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <button onClick={toggleDarkMode}>
        <FaMoon className={`text-2xl ${darkMode ? "hidden" : ""}`} />
        <FaSun className={`text-2xl  ${darkMode ? "" : "hidden"}`} />
      </button>
    </>
  );
};

export default DarkmodeBtn;
