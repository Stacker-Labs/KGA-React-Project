import React from "react";
import { Link } from "react-router-dom";

import SearchhBar from "../molecules/SearchBar";
import Button from "../../tw_components/atoms/Buttons";
import {
  Bell_icon,
  Darkmode_icon,
  Lightmode_icon,
  TempUserImg,
} from "../../images";

const Header = () => {
  return (
    <div className="w-[100%] h-[80px] border-b flex flex-row items-center justify-center">
      <div className="w-[40%] flex flex-row items-center justify-around">
        <Link to={"/"} className="font-logo text-4xl text-accent-blue ">
          Stacker-Labs
        </Link>
        <SearchhBar />
      </div>
      <div className="w-[60%] flex flex-row justify-evenly items-center">
        <Button variant={"white"} size={"md"}>
          Admin
        </Button>
        <Button variant={"white"} size={"md"}>
          Create Post
        </Button>
        <Button variant={"white"} size={"md"}>
          Login
        </Button>
        <Button variant={"white"} size={"md"}>
          Sign Up
        </Button>
        <button>
          <img className="w-[80%]" src={Darkmode_icon} alt="dark mode icon" />
        </button>
        <button>
          <img className="w-[80%]" src={Lightmode_icon} alt="dark mode icon" />
        </button>
        <button>
          <img className="w-[80%]" src={Bell_icon} alt="dark mode icon" />
        </button>
        <Link to={"/users"}>
          <img
            className="w-[40px] h-[40px] rounded-3xl"
            src={TempUserImg}
            alt=""
          />
        </Link>
      </div>
    </div>
  );
};

export default Header;
