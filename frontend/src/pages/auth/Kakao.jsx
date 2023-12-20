import { useEffect } from "react";
import useLogin from "../../hooks/useLogin";
import { useLocation } from "react-router-dom";

export default () => {
  const { login } = useLogin();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get("code");

  useEffect(() => {
    const kakaoLogin = async () => {
      await login("kakao", { code });
    };

    kakaoLogin();
  }, []);
  return <div>Login to Kakao...</div>;
};
