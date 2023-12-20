import React from "react";
import Button from "../atoms/Buttons";
import Input from "../atoms/Inputs";
import { LoginRequest } from "../../pages/auth/dto/LoginDTO";
import useLogin from "../../hooks/useLogin";

const LoginForm = () => {
  const { id, setId, password, setPassword, login } = useLogin();
  const bodyContent = new LoginRequest({ id, password });

  const handleLogin = async (e) => {
    e.preventDefault();

    await login("login", bodyContent);
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col items-center">
      <Input
        required
        onChange={(e) => setId(e.target.value)}
        name="username"
        // value={id}
        type="text"
        placeholder="ID"
      />
      <Input
        required
        onChange={(e) => setPassword(e.target.value)}
        name="password"
        // value={password}
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
