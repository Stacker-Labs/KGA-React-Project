import React from "react";
import { Link } from "react-router-dom";

const UserMenu = () => {
  return (
    <ul className="fixed top-80px right-10 w-[200px] px-5 rounded-lg z-40 bg-white shadow-md">
      <li className="border-b py-4 cursor-pointer">
        <Link className="cursor-pointer" to={"/users/1"}>
          UserName
        </Link>
      </li>
      <li className="py-2">
        <Link to={"/"}>Dashboard</Link>
      </li>
      <li className="py-2">
        <Link to={"/boards"}>Create Post</Link>
      </li>
      <li className="py-2">
        <Link to={"/"}>Reading List</Link>
      </li>
      <li className="border-b py-2">
        <Link to={"/users/1/edit"}>Settings</Link>
      </li>
      <li className="py-5 cursor-pointer">
        <Link to={"/auth/logout"}>Log out</Link>
      </li>
    </ul>
  );
};

export default UserMenu;
