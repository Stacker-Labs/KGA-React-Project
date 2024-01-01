import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userState } from "../../recoil/userState";
import { useResetRecoilState } from "recoil";

export const logoutFunc = async () => {
  const host = `${process.env.REACT_APP_API_SERVER}/auth/logout`;
  const response = await fetch(host, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const result = await response.json();
  console.log("logout result", result);
};

const Logout = () => {
  const resetUserState = useResetRecoilState(userState);
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      await logoutFunc();
      resetUserState();
      alert("You've been logged out.");
      navigate("/");
    };
    performLogout();
  }, [resetUserState, navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
