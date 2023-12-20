import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

export default () => {
  const { login } = useLogin();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get("code");

  useEffect(() => {
    const githubLogin = async () => {
      await login("github", { code });
    };

    githubLogin();
  }, []);
  return <div>Login to Github...</div>;
};
