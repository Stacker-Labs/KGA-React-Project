import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import SearchBox from "../components/molecules/SearchBox";

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
        console.log(queryParams.get("q"));
        const response = await axios.get(
          `${process.env.REACT_APP_API_SERVER}/search/1?q=${queryValue}`
        );
        console.log(
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
      <div className=" w-7/12 mx-auto py-5 font-serif flex justify-between items-center">
        <div className="text-3xl">Search results for {searchQuery} </div>
        <ul className="flex flex-row gap-5">
          <li className="p-2 hover:bg-accent-blue hover:text-white hover:rounded-lg ">
            Most Relevant
          </li>
          <li className="p-2 hover:bg-accent-blue hover:text-white hover:rounded-lg">
            Newest
          </li>
          <li className="p-2 hover:bg-accent-blue hover:text-white hover:rounded-lg">
            Oldest
          </li>
        </ul>
      </div>
      <div className=" w-7/12 mx-auto flex flex-row gap-8">
        <ul className="w-[30%] flex flex-col gap-2 ">
          <li className="border rounded-lg p-2 hover:border-accent-blue">
            Posts
          </li>
          <li className="border rounded-lg p-2 hover:border-accent-blue">
            Tags
          </li>
          <li className="border rounded-lg p-2 hover:border-accent-blue">
            Posts
          </li>
          <li className="border rounded-lg p-2 hover:border-accent-blue">
            Tags
          </li>
        </ul>
        <div className=" w-[80%] flex flex-col gap-5 ">
          <SearchBox searchBoard={searchBoard} />
        </div>
      </div>
    </>
  );
};

export default Search;
