import React from "react";
import { Link } from "react-router-dom";

const UserMenu = ({ user }) => {
  return (
    <ul className="fixed top-[5.25rem] right-7 w-[200px] px-5 rounded-lg z-40 bg-white shadow-lg shadow-[#777] dark:text-black">
      <li className="border-b py-4 cursor-pointer">
        <Link className="cursor-pointer" to={`/users/${user?.id}`}>
          @{user?.nickname}
        </Link>
      </li>
      <li className="py-2">
        <Link to={"/"}>Feed</Link>
      </li>
      <li className="py-2">
        <Link to={"/boards"}>Create Post</Link>
      </li>
      <li className="py-2">
        <Link to={"/admin"}>Dashboard</Link>
      </li>
      <li className="border-b py-2">
        <Link to={`/users/${user?.id}/edit`}>User Settings</Link>
      </li>
      <li className="py-5 cursor-pointer">
        <Link to={"/auth/logout"}>Log out</Link>
      </li>
    </ul>
  );
};

export default UserMenu;
