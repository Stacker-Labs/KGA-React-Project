import React from "react";
import { Link } from "react-router-dom";

const TextLink = ({ to, children }) => {
  return (
    <Link
      to={to}
      className="flex flex-row border rounded-lg items-center p-2.5 hover:border-accent-blue"
    >
      {children}
    </Link>
  );
};

export default TextLink;
