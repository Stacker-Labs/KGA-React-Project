import React from "react";
import NavigationItem from "../molecules/NavigationItem";
import { Github_icon, Notion_icon, Notion_white } from "../../images";
import { useRecoilValue } from "recoil";
import { darkModeState } from "../../recoil/darkmode";
import { white_github } from "../../images/login_assets";

const Sidebar = () => {
  const darkMode = useRecoilValue(darkModeState);

  return (
    <div className="w-1/6 border-r tablet:w-1/4 note:w-1/5">
      <ul className="flex flex-col p-5 gap-3">
        <NavigationItem to={"/"} text="🌐 Home" />
        <NavigationItem to={"/tags"} text="🏷️ Tags" />
        <NavigationItem to={"/"} text="❔ FAQ" />
      </ul>
      <div className="flex flex-row gap-10 justify-center py-5">
        <a
          href="https://github.com/Stacker-Labs/KGA-React-Project"
          target="_blank"
          rel="noreferrer"
        >
          {darkMode ? (
            <img className="w-9" src={white_github} alt="" />
          ) : (
            <img className="w-9" src={Github_icon} alt="" />
          )}
        </a>
        <a
          href="https://www.notion.so/Overview-18c6b82164074d70833bc36ea85ed007"
          target="_blank"
          rel="noreferrer"
        >
          {darkMode ? (
            <img className="w-9" src={Notion_white} alt="" />
          ) : (
            <img className="w-9" src={Notion_icon} alt="" />
          )}
        </a>
      </div>
      <div className="p-7">
        <p className="text-sm">
          This website is developed with
          <br /> reference to dev.to DEV Community
          <br /> © 2023. Stacker-Labs
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
