import React from "react";
import { cn } from "../../utils/cn";
import { No_Profile } from "../../images";
import { FaRegPaperPlane } from "react-icons/fa6";
// import axios from "axios";
// import { io } from "socket.io-client";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/userState";
import { Link } from "react-router-dom";

const Chat = () => {
  const { user } = useRecoilValue(userState);
  console.log(user.id);
  const room = user.rooms;
  // const [socket, setSocket] = useState(null);
  // const [chat, setChat] = useState(null);
  // const roomId = 2;

  // useEffect(() => {
  //   if (!socket) {
  //     setSocket(io(`ws://api.subin.kr/room/${roomId}`));
  //   } else {
  //     socket.on(`${roomId}`, (data) => {
  //       setChat(data);
  //     });

  //     const getChats = async () => {
  //       try {
  //         const response = await axios.get(
  //           `${process.env.REACT_APP_API_SERVER}/room/${roomId}`,
  //           {
  //             headers: {
  //               Authorization:
  //                 "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJuYW1lIiwiaWF0IjoxNzAzNjU3NjU3LCJleHAiOjE3MDM2NjEyNTd9.K8_L0kvdVjqorI6qRbylBa8wqxqffiDnvtlqhlU3Gss",
  //             },
  //           }
  //         );
  //         console.log(response);
  //       } catch (error) {
  //         console.log(`error :`, error);
  //       }
  //     };
  //     getChats();
  //   }
  // }, []);

  return (
    <div
      className={cn(
        "bg-blue-500 relative w-full h-[700px] rounded-md",
        "note:h-[485px]"
      )}
    >
      <div className="flex flex-col gap-3 p-5">
        <div className="text-xl pb-2">친구 {room?.length} 명 </div>
        <div>
          {room?.map((item, index) => (
            <ul
              key={index}
              className="flex flex-row items-center gap-6 justify-between p-2 border-b"
            >
              <li>
                {item.users
                  .filter((userItem) => userItem.id !== user.id)
                  .map((chatUserItem, chatUserIndex) => {
                    return (
                      <Link to={`/users/${chatUserItem.id}`}>
                        <img
                          src={chatUserItem.image || No_Profile}
                          key={chatUserIndex}
                          className="w-[35px] h-[35px] rounded-3xl mobile:w-[45px] mobile:h-[45px]"
                          alt=""
                        />
                      </Link>
                    );
                  })}
              </li>
              <li>{item.id}</li>
              <li className="text-lg">
                {item.users
                  .filter((userItem) => userItem.id !== user.id)
                  .map((chatUserItem, chatUserIndex) => {
                    return (
                      <Link
                        to={`/users/${chatUserItem.id}`}
                        key={chatUserIndex}
                      >
                        {chatUserItem.nickname}
                      </Link>
                    );
                  })}
              </li>
              <li className="text-xl">
                <FaRegPaperPlane />
              </li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chat;
