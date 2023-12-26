import React from "react";
import { Link } from "react-router-dom";
import { cn } from "../../utils/cn";

const WelcomBox = () => {
  return (
    <div
      className={cn(
        "rounded-2xl bg-accent-blue w-4/6 p-16",
        "note:p-12 note:w-5/6",
        "tablet:w-[90%] tablet:p-5",
        "mobile:w-5/6 p-4"
      )}
    >
      <p className="tablet:text-3xl mobile:text-2xl font-logo text-5xl text-white py-4">
        stacker-labs
      </p>
      <p className="tablet:text-3xl mobile:text-2xl font-logo text-4xl text-white py-4">
        You’re now a part of the community!
      </p>
      <br />
      <Link
        to={"/users"}
        className="text-xl text-white py-4 bg-white bg-opacity-50 block rounded-xl mobile:text-sm"
      >
        <span className="px-3 mobile:px-2">Customize your profile 👉</span>
      </Link>
    </div>
  );
};

export default WelcomBox;
