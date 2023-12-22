import React from "react";
import { FaRegPaperPlane } from "react-icons/fa6";
import { cn } from "../../utils/cn";

const ChatContent = () => {
  return (
    <div
      className={cn(
        "border-l relative w-1/5",
        "note:w-1/5 tablet:hidden mobile:hidden"
      )}
    >
      <div className="fixed bottom-10 right-20 w-[50px] h-[50px] rounded-3xl bg-accent-blue flex justify-center items-center">
        <FaRegPaperPlane className=" text-white text-xl" />
      </div>
    </div>
  );
};

export default ChatContent;
