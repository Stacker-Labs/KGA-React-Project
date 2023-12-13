import React from "react";
import { Search_icon } from "../../images";

const SearchhBar = () => {
  return (
    <form className="border border-solid border-gray-300 rounded-lg w-[400px] h-[35px] flex items-center ">
      <input
        type="text"
        placeholder={"Search..."}
        className="border-none w-[90%] pl-2"
      />
      <button className="w-[10%]">
        <img src={Search_icon} alt="" className="w-[60%] " />
      </button>
    </form>
  );
};

export default SearchhBar;
