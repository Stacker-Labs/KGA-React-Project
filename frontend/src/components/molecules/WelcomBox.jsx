import React from "react";
import { Link } from "react-router-dom";

const WelcomBox = () => {
  return (
    <div className="border rounded-2xl bg-accent-blue w-[800px] p-16">
      <p className="font-logo text-5xl text-white py-4">stacker-labs</p>
      <p className="font-logo text-4xl text-white py-4">
        You’re now a part of the community!
      </p>
      <br />
      <Link
        to={"/users"}
        className="text-xl text-white py-4 bg-white bg-opacity-50 block rounded-xl"
      >
        <span className="px-3">Customize your profile 👉</span>
      </Link>
    </div>
  );
};

export default WelcomBox;
