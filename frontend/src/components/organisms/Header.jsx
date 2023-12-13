import React from "react";
import Logo from "../atoms/Logo";
import SearchhBar from "../molecules/SearchBar";
import Button from "../../tw_components/atoms/Buttons";

const Header = () => {
  return (
    <div className="w-[100%] h-[50px] border-b flex flex-row items-center justify-evenly">
      <Logo />
      <SearchhBar />
      <Button variant={"white"} size={"md"}>
        Admin
      </Button>
      <Button variant={"white"} size={"md"}>
        Create Post
      </Button>
    </div>
  );
};

export default Header;
