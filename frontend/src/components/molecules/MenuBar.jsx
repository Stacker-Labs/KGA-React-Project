import React, { useState } from "react";
import NavigationItem from "./NavigationItem";
import { Link } from "react-router-dom";
import Button from "../../tw_components/atoms/Buttons";
import { cn } from "../../utils/cn";
import {
  Github_icon,
  Notion_icon,
  Notion_white,
  Search_icon,
} from "../../images";
import { white_github } from "../../images/login_assets";
import { useRecoilValue } from "recoil";
import { darkModeState } from "../../recoil/darkmode";

const MenuBar = ({ user, handleSearch, mobileMenu, setMobileMenu }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const darkMode = useRecoilValue(darkModeState);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  const closeMenu = () => {
    setMobileMenu(false);
  };

  return (
    <div
      className={cn(
        "hidden mobile:inline-block h-[700px] relative",
        "w-4/5 fixed top-0 right-0 bg-white rounded-sm",
        "mobile:text-base",
        "transition-opacity duration-400 ease-in-out",
        mobileMenu ? "opacity-100" : "opacity-0 pointer-events-none",
        darkMode ? "dark" : ""
      )}
    >
      <span
        onClick={closeMenu}
        className="block h-[50px] p-5 text-right text-xl"
      >
        X
      </span>
      <ul className="flex flex-col p-7 gap-4">
        <NavigationItem to={"/"} text="🌐 Home" />
        <NavigationItem to={"/tags"} text="🏷️ Tags" />
        <li>
          <form
            onSubmit={handleSubmit}
            className={cn(
              "flex items-center justify-center border rounded-lg h-[40px] focus:outline"
            )}
          >
            <input
              required
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              placeholder={"Search..."}
              className="border-none w-[90%] pl-3 focus:outline dark:bg-transparent"
            />
            <button className="w-[10%]">
              <img src={Search_icon} alt="" className="w-[60%] " />
            </button>
          </form>
        </li>
        <li className="flex flex-wrap justify-between gap-5 ">
          {user?.id && (
            <Link to={"/boards"}>
              <Button variant={"white"} size={"md"}>
                Create Post
              </Button>
            </Link>
          )}
          {user?.id ? (
            <Link to={"/auth/logout"}>
              <Button variant={"white"} size={"md"}>
                Logout
              </Button>
            </Link>
          ) : (
            <Link to={"/auth"}>
              <Button variant={"white"} size={"md"}>
                Login
              </Button>
            </Link>
          )}
          {!user?.id && (
            <Link to={"/auth/register"}>
              <Button variant={"white"} size={"md"}>
                Sign Up
              </Button>
            </Link>
          )}
          {user?.role === "ADMIN" && (
            <Link to={"/admin"}>
              <Button variant={"white"} size={"md"}>
                Admin
              </Button>
            </Link>
          )}
          {user?.id && (
            <Link to={`/users/${user.id}`}>
              <Button variant={"white"} size={"md"}>
                Your Profile
              </Button>
            </Link>
          )}
        </li>
      </ul>
      <div className="fixed bottom-7 right-8">
        <div className="flex flex-row gap-10 justify-center py-7">
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
        <div>
          <p className="text-sm">
            This website is developed with
            <br /> reference to dev.to DEV Community
            <br /> © 2023. Stacker-Labs
          </p>
        </div>
      </div>
    </div>
  );
};
export default MenuBar;
