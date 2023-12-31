import React, { useEffect, useState } from "react";
import { Search_icon } from "../../images";
import { cn } from "../../utils/cn";
import { useLocation } from "react-router-dom";

const SearchBar = ({ handleSearch }) => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setSearchQuery("");
  }, [location.pathname]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex items-center justify-center px-2 outline-none",
        "border border-solid border-gray-300 rounded-lg w-[300px] h-[35px]",
        "tablet:hidden",
        "mobile:hidden"
      )}
    >
      <input
        required
        onChange={(e) => setSearchQuery(e.target.value)}
        type="text"
        placeholder={"Search..."}
        value={searchQuery}
        className="border-none w-[90%] pl-2 dark:bg-transparent outline-none"
      />
      <button className="w-[10%]">
        <img src={Search_icon} alt="" className="w-[60%] " />
      </button>
    </form>
  );
};

export default SearchBar;
