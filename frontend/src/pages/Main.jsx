import React, { useEffect, useState } from "react";
import Sidebar from "../components/organisms/Sidebar";
import MainContent from "../components/organisms/MainContent";
import ChatContent from "../components/organisms/ChatContent";
import axios from "axios";
import { cn } from "../utils/cn";
// import SearchBar from "../components/molecules/SearchBar";

const Main = () => {
  const [data, setData] = useState({});
  const [board, setBoard] = useState([]);
  const [page, setPage] = useState(false);

  useEffect(() => {
    if (!data.boards) {
      const boardData = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_SERVER}/page/1`
          );
          setData(response.data);
          setBoard(response.data.boards);
          setPage(response.data.nextPage);
        } catch (error) {
          console.log(`error :`, error);
        }
      };
      boardData();
    }

    const scroll = async () => {
      try {
        const height = document.documentElement.scrollTop + window.innerHeight;
        const scrollPosition = document.documentElement.scrollHeight;
        if (height >= scrollPosition * 0.8) {
          const response = await axios.get(
            `${process.env.REACT_APP_API_SERVER}/page/${page}`
          );
          setBoard([...board, ...response.data.boards]);
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
  }, [page]);

  return (
    <>
      <div className={cn("flex desktop:w-full items-stretch")}>
        <Sidebar />
        <MainContent board={board} />
        <ChatContent />
      </div>
    </>
  );
};

export default Main;
