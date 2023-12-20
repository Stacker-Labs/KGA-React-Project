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

        if (usersData.message) {
          setUser(usersData);
          console.log(user);
        } else {
          console.log(usersData.message + "Cannot retrieve usersData.");
        }

        navigate("/");
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
