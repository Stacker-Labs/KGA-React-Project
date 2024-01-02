import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../recoil/userState";

const useRenewCookie = (interval = 3300000) => {
  const userData = useRecoilValue(userState);
  // Default interval set to 55 minutes
  const renewCookie = async () => {
    // API call to renew the cookie
    try {
      console.log("Cookie Renewal Request awaiting...");
      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER}/users`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      console.log("Cookie Renewal Requested");
      const result = await response.json();
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };

  const { mutate, isError, isSuccess, error } = useMutation({
    mutationFn: renewCookie,
    onSuccess: () => {
      console.log("succeeded.");
    },
    onError: () => {
      console.log("Since there is no userinfo, cookie renewal is cancelled.");
    },
  });

  useEffect(() => {
    // Periodically renew the cookie
    if (userData.user.id) {
      const intervalId = setInterval(() => {
        mutate();
        console.log(`${error}:${isError}/${isSuccess}`);
      }, interval);

      return () => clearInterval(intervalId);
    }
  }, [mutate, interval]);

  return { isError, isSuccess, error };
};

export default useRenewCookie;
