import React, { useEffect, useState } from "react";
import Header from "../components/organisms/Header";
import PostBox from "../components/molecules/PostBox";
import axios from "axios";

const Search = () => {
  const [board, setBoard] = useState([]);

  useEffect(() => {
    const boardData = async () => {
      try {
        const response = await axios.get("https://api.subin.kr/");
        setBoard(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(`error :`, error);
      }
    };
    boardData();
  }, []);
  return (
    <>
      <Header />
      <div className=" w-7/12 mx-auto py-5 font-serif flex justify-between items-center">
        <div className="text-3xl">Search results for 'react'</div>
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
          <PostBox board={board} />
        </div>
      </div>
    </>
  );
};

export default Search;
