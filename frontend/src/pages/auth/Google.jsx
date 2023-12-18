import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../../recoil/User";

export default () => {
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();

  useEffect(() => {
    const code = window.location.hash.substring(1).split("&")[0].split("=")[1];
    const getAccessToken = async () => {
      if (code) {
        const response = await fetch(
          `${process.env.REACT_APP_API_SERVER}/auth/google`,
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              code,
            }),
          }
        );
        const result = await response.json();
        setUser(result);
        console.log(result);
      }
    };
    getAccessToken();
    navigate("/");
  }, []);

  return <div>Login to Google...</div>;
};
