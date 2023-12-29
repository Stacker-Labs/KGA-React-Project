import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../recoil/userState";

const useLogin = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();

  const login = async (mode, bodyData) => {
    try {
      const loginHost = `${process.env.REACT_APP_API_SERVER}/auth/${mode}`;
      const loginOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(bodyData),
      };

      const loginResponse = await fetch(loginHost, loginOptions);
      const loginData = await loginResponse.json();

      if (loginData.message) {
        const usersHost = `${process.env.REACT_APP_API_SERVER}/users`;
        const usersOptions = {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        };

        const usersReponse = await fetch(usersHost, usersOptions);
        const usersData = await usersReponse.json();

        if (usersData.message === "Access token is in cookie now.") {
          setUser(usersData);
          alert(`Welcome, ${usersData.user.nickname}!`);
          navigate("/");
        } else if (usersData.statusCode === 401) {
          alert("Invalid user data.");
        } else if (usersData.statusCode === 400) {
          alert("This user doesn't exist.");
        } else {
          alert("Server Error!");
        }
      } else {
        console.log(loginData.message + "Cannot fetch user cookie.");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return { id, setId, password, setPassword, user, login };
};

export default useLogin;
