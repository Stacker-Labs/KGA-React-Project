import React, { useState } from "react";
import { Search_icon } from "../../images";
// import axios from "axios";

const SearchBar = ({ handleSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-solid border-gray-300 rounded-lg w-[300px] h-[35px] flex items-center "
    >
      <input
        onChange={(e) => setSearchQuery(e.target.value)}
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

export default SearchBar;
