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
      const response = await fetch("https://api.subin.kr/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(new LoginRequest({ id, password })),
      });
      const result = await response.json();
      console.log(result);
      if (result.accessToken) navigate("/");
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
