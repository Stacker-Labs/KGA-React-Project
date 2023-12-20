import { useEffect } from "react";
import useLogin from "../../hooks/useLogin";

export default () => {
  const { login } = useLogin();
  const code = window.location.hash.substring(1).split("&")[0].split("=")[1];

  useEffect(() => {
    const googleLogin = async () => {
      await login("google", { code });
    };

    googleLogin();
  }, []);

  return <div>Login to Google...</div>;
};
