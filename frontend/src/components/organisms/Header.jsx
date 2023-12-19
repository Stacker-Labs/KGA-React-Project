import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SearchBar from "../molecules/SearchBar";
import Button from "../../tw_components/atoms/Buttons";
import {
  Bell_icon,
  Darkmode_icon,
  Lightmode_icon,
  TempUserImg,
} from "../../images";

const Header = () => {
  const [isUserMenuVisible, setIsUserMenuVisible] = useState(false);
  const navigate = useNavigate();

  const toggleUserMenu = () => {
    setIsUserMenuVisible(!isUserMenuVisible);
  };

  const handleSearch = async (query) => {
    try {
      const response = await axios(
        `${process.env.REACT_APP_API_SERVER}/search/1?q=${query}`
      );
      console.log(response.data);
      navigate(`/search/1?q=${encodeURIComponent(query)}`);
    } catch (error) {
      console.log(`error :`, error);
    }
  };

  return (
    <>
      <div className="sticky top-0 w-[100%] h-[80px] border-b flex flex-row items-center justify-center z-30 bg-white">
        <div className="w-[40%] flex flex-row items-center justify-around">
          <Link to={"/"} className="font-logo text-4xl text-accent-blue ">
            Stacker-Labs
          </Link>
          <SearchBar handleSearch={handleSearch} />
        </div>
        <div className="w-[60%] flex flex-row justify-evenly items-center">
          <Link to={"/admin"}>
            <Button variant={"white"} size={"md"}>
              Admin
            </Button>
          </Link>
          <Link to={"/boards"}>
            <Button variant={"white"} size={"md"}>
              Create Post
            </Button>
          </Link>
          <Link to={"/auth"}>
            <Button variant={"white"} size={"md"}>
              Login
            </Button>
          </Link>
          <Link to={"/auth/register"}>
            <Button variant={"white"} size={"md"}>
              Sign Up
            </Button>
          </Link>
          <button>
            <img className="w-[70%]" src={Darkmode_icon} alt="dark mode icon" />
          </button>
          <button>
            <img
              className="w-[70%]"
              src={Lightmode_icon}
              alt="dark mode icon"
            />
          </button>
          <button>
            <img className="w-[70%]" src={Bell_icon} alt="dark mode icon" />
          </button>
          {/* <Link to={"/users"}> */}
          <img
            onClick={toggleUserMenu}
            className="w-[40px] h-[40px] rounded-3xl cursor-pointer"
            src={TempUserImg}
            alt=""
          />
          {/* </Link> */}
        </div>
      </div>

      {isUserMenuVisible && (
        <ul className="fixed top-80px right-10 w-[200px] border px-5 rounded-lg z-40 bg-white">
          <li className="border-b py-4 cursor-pointer">
            <Link className="cursor-pointer" to={"/users"}>
              UserName
            </Link>
          </li>
          <li className="py-2">
            <Link to={"/"}>Dashboard</Link>
          </li>
          <li className="py-2">
            <Link to={"/boards"}>Create Post</Link>
          </li>
          <li className="py-2">
            <Link to={"/"}>Reading List</Link>
          </li>
          <li className="border-b py-2">
            <Link to={"/users"}>Settings</Link>
          </li>
          <li className="py-5">
            <Link to={"/auth/logout"}>Log out</Link>
          </li>
        </ul>
      )}
    </>
  );
};

export default Header;
