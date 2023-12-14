import React from "react";
import NavigationItem from "../molecules/NavigationItem";
import { Link } from "react-router-dom";
import { Github_icon, Notion_icon } from "../../images";

const Sidebar = () => {
  return (
    <div className="w-1/5">
      <ul className="flex flex-col p-5 gap-3">
        <NavigationItem to={"/"} text="🌐 Home" />
        <NavigationItem to={"/tags"} text="🏷️ Tags" />
        <NavigationItem to={"/"} text="❔ FAQ" />
      </ul>
      <div className="flex flex-row gap-10 justify-center">
        <Link to={"https://github.com/Stacker-Labs/KGA-React-Project"}>
          <img className="w-8" src={Github_icon} alt="" />
        </Link>
        <Link
          to={
            "https://www.notion.so/dd5787af1d7b41f196646bfa607814cb?v=931c9b67412e48fea67b7f2a41d8a9cd&pvs=4"
          }
        >
          <img className="w-8" src={Notion_icon} alt="" />
        </Link>
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
