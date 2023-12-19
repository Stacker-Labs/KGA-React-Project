import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../components/organisms/Sidebar";
import MainContent from "../components/organisms/MainContent";
import ChatContent from "../components/organisms/ChatContent";
import axios from "axios";

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
    if (page) {
      window.removeEventListener("scroll", () => {});
      const scroll = async () => {
        try {
          const height =
            document.documentElement.scrollTop + window.innerHeight;
          const scrollPosition = document.documentElement.scrollHeight;
          if (height >= scrollPosition * 0.8) {
            const response = await axios.get(
              `${process.env.REACT_APP_API_SERVER}/page/${page}`
            );
            setBoard([...board, ...response.data.boards]);
            setPage(response.data.nextPage);
          }
        } catch (error) {
          console.log(`error :`, error);
        }
      };
      window.addEventListener("scroll", scroll);
    } else {
      window.removeEventListener("scroll", () => {});
    }
  }, [page]);
  console.log(board);

  return (
    <>
      <div className="flex w-full items-stretch">
        <Sidebar />
        <MainContent board={board} />
        <ChatContent />
      </div>
    </>
  );
};

export default Main;
