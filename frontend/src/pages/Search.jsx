import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import SearchBox from "../components/molecules/SearchBox";
import { cn } from "../utils/cn";

const Search = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchBoard, setSearchBoard] = useState([]);
  const [page, setPage] = useState(false);

  useEffect(() => {
    const result = async () => {
      try {
        const queryValue = queryParams.get("q");
        setSearchQuery(queryValue);
        const response = await axios.get(
          `${process.env.REACT_APP_API_SERVER}/search/1?q=${queryValue}`
        );
        setSearchBoard(response.data.boards);
        setPage(response.data.nextPage);
      } catch (error) {
        console.log(`error :`, error);
      }
    };

    if (queryParams.get("q") !== searchQuery) {
      result();
    }

    const scroll = async () => {
      try {
        const height = document.documentElement.scrollTop + window.innerHeight;
        const scrollPosition = document.documentElement.scrollHeight;
        if (height >= scrollPosition * 0.8) {
          const response = await axios.get(
            `${process.env.REACT_APP_API_SERVER}/search/${page}?q=${searchQuery}`
          );
          setSearchBoard([...searchBoard, ...response.data.boards]);
          setPage(response.data.nextPage);
          document.onscroll = null;
        }
      } catch (error) {
        console.log(`error :`, error);
      }
    };
    if (page) document.onscroll = scroll;
    return () => {
      document.onscroll = null;
    };
  }, [page, searchQuery, queryParams]);

  return (
    <>
      <div
        className={cn(
          "w-5/12 mx-auto py-5 flex justify-between",
          "tablet:w-11/12 tablet:py-7",
          "mobile:w-full mobile:px-5 mobile:flex-col mobile:justify-start"
        )}
      >
        <div className="text-3xl mobile:text-lg">
          Search results for {searchQuery}
        </div>
        <div className="text-xl mobile:text-base">
          Total : {searchBoard.length} post
        </div>
      </div>
      <div
        className={cn(
          "w-5/12 mx-auto flex flex-row gap-8 justify-between",
          "tablet:w-11/12",
          "mobile:w-full"
        )}
      >
        <div className="w-full mx-auto flex flex-col gap-5 mobile:mx-5">
          <SearchBox searchBoard={searchBoard} />
        </div>
      </div>
    </>
  );
};

export default Search;
