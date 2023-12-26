import React from "react";
import { FaBars } from "react-icons/fa6";

const MenuBar = () => {
  return (
    <div className="hidden mobile:inline-block">
      <FaBars className="mobile:text-2xl mobile:mx-5" />
    </div>
  );
};

export default MenuBar;
