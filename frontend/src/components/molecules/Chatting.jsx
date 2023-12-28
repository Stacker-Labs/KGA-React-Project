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

  useEffect(() => {
    if (!socket) {
      setSocket(io(`ws://api.subin.kr/room/${roomId}`));
    } else {
      socket.on(`${roomId}`, (data) => {
        setChat(data);
      });

      const getChats = async () => {
        try {
          console.log(roomId);
          const response = await axios.get(
            `${process.env.REACT_APP_API_SERVER}/room/${roomId}`,
            { withCredentials: true }
          );
          console.log(`${process.env.REACT_APP_API_SERVER}/room/${roomId}`);
          const result = response.data;
          console.log(result);

          // 지난대화 내용이 보여져야햠!
          result.forEach((chat) => {
            const chatDiv = document.createElement("div");
            chatDiv.innerText = `${chat.content}`;
            chatRef.current.appendChild(chatDiv);
          });
        } catch (error) {
          console.log(`error :`, error);
        }
      };
      getChats();
    }
  }, [socket]);

  useEffect(() => {
    if (chat) {
      // 현재 대화내용
      const chatDiv = document.createElement("div");
      chatDiv.innerText = `${chat.content}`;
      chatRef.current.appendChild(chatDiv);
    }
  }, [chat]);

  const sendMessage = () => {
    socket.emit("send-message", {
      user: {
        id: user.id,
      },
      content: inputRef.current.value,
    });
    setChat({
      user: "my message",
      content: inputRef.current.value,
    });
  };

  return (
    <div
      className={cn(
        "relative bg-blue-500 w-full h-[700px] rounded-md",
        "note:h-[485px]"
      )}
    >
      <div className="flex flex-col gap-3 p-5">
        <div className="flex flex-row items-center text-xl pb-2 gap-3">
          <div>
            <img src={image} className="w-[50px] h-[50px] rounded-3xl" alt="" />
          </div>
          <div>{nickname}</div>
        </div>

        <div className="absolute bottom-0 right-0 w-full p-4">
          <div
            ref={chatRef}
            className="absolute bottom-[65px] right-5 bg-slate-400 rounded-lg text-lg p-3"
          ></div>
          <input
            placeholder="chat..."
            ref={inputRef}
            className="text-black w-3/4 h-[35px] rounded-md px-2"
          />
          <button onClick={sendMessage} className="w-1/4">
            send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatting;
