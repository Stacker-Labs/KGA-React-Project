import React, { useState } from "react";
import Button from "../atoms/Buttons";
import Input from "../atoms/Inputs";
import { useNavigate } from "react-router-dom";
import { LoginRequest } from "../../pages/auth/dto/LoginDTO";

const LoginForm = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const loginHost = `${process.env.REACT_APP_API_SERVER}/auth/login`;
      const loginOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(new LoginRequest({ id, password })),
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

        if (usersData.message) console.log(usersData);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <Input
        required
        onChange={(e) => setId(e.target.value)}
        name="username"
        type="text"
        placeholder="ID"
      />
      <Input
        required
        onChange={(e) => setPassword(e.target.value)}
        name="password"
        type="password"
        placeholder="Password"
      />
      <Button variant={"blue"} size={"sign"}>
        <span className="text-white">Sign In</span>
      </Button>
    </form>
  );
};

export default LoginForm;
