import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../../recoil/userState";

export default () => {
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();

  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    const getAccessToken = async () => {
      if (code) {
        const response = await fetch(
          `${process.env.REACT_APP_API_SERVER}/auth/kakao`,
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

        // const result = await response.json();

        // if (result.message) {
        //   const response = await fetch(
        //     `${process.env.REACT_APP_API_SERVER}/auth/users`,
        //     {
        //       method: "get",
        //       headers: {
        //         "Content-Type": "application/json",
        //       },
        //       credentials: "include",
        //     }
        //   );
        // }

        // const userResult = await response.json();

        // if (userResult.message) {
        //   console.log(userResult);
        // }
        // // fetch user info here
        // // setUser(result);
      }
    };
    getAccessToken();
    navigate("/");
  }, []);
  return <div>Login to Kakao...</div>;
};
