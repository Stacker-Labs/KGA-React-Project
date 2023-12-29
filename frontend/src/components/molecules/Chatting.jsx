import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { cn } from "../../utils/cn";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/userState";

const Chatting = ({ roomId, nickname, image }) => {
  const { user } = useRecoilValue(userState);
  const inputRef = useRef(null);
  const chatRef = useRef(null);
  const [socket, setSocket] = useState(null);
  const [chat, setChat] = useState(null);
  const [chatLoad, setChatLoad] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (!socket) {
      setSocket(io(`wss://api.subin.kr/room/${roomId}`));
    } else {
      socket.on(`${roomId}`, (data) => {
        setChat(data);
      });

      if (!chatLoad) {
        const getChats = async () => {
          try {
            const response = await axios.get(
              `${process.env.REACT_APP_API_SERVER}/room/${roomId}`,
              { withCredentials: true }
            );
            const result = response.data;
            // 지난대화 내용이 보여져야햠!
            result.forEach((chat) => {
              const chatDiv = document.createElement("div");
              chatDiv.innerText = `${chat.content}`;
              chatDiv.className =
                user.id === chat.user.id ? "text-right p-1" : "text-left p-1";
              chatRef.current.appendChild(chatDiv);
            });
            setChatLoad(true);
          } catch (error) {
            console.log(`error :`, error);
          }
        };
        getChats();
      }
    }
  }, [socket, chatLoad]);

  useEffect(() => {
    if (chat) {
      // 현재 대화내용
      const chatDiv = document.createElement("div");
      chatDiv.innerText = `${chat.content}`;
      chatDiv.className =
        user.id === chat.user.id ? "text-right p-1" : "text-left p-1";
      chatRef.current.appendChild(chatDiv);
    }
  }, [chat]);

  const sendMessage = () => {
    socket.emit("send-message", {
      user: {
        id: user.id,
      },
      content: inputValue,
    });
    setChat({
      user: {
        id: user.id,
      },
      content: inputValue,
    });
    setInputValue("");
  };

  return (
    <div
      className={cn(
        "relative bg-blue-500 w-full h-[700px] rounded-md",
        "shadow-lg shadow-[#777]",
        "note:h-[485px]"
      )}
    >
      <div className="flex flex-col gap-3 p-5 h-[700px] overflow-hidden">
        <div className="flex flex-row items-center text-xl pb-2 gap-3">
          <div>
            <img src={image} className="w-[50px] h-[50px] rounded-3xl" alt="" />
          </div>
          <div>{nickname}</div>
        </div>
        <div className="absolute bottom-0 right-0 w-full p-4 overflow-y-auto">
          <div ref={chatRef} className="text-lg p-3 w-full"></div>
          <input
            placeholder="chat..."
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            className="w-full text-black h-[35px] rounded-md px-2 outline-none border-none"
          />
        </div>
      </div>
    </div>
  );
};

export default Chatting;
