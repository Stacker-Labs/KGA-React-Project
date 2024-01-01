import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

const useRenewCookie = (interval = 3300000) => {
  // Default interval set to 55 minutes
  const renewCookie = async () => {
    // API call to renew the cookie
    console.log("Cookie Renewal Request awaiting...");
    const response = await fetch(`${process.env.REACT_APP_API_SERVER}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    console.log("Cookie Renewal Requested");
    const result = await response.json();
    console.log(result);
  };

  const { mutate, isError, isSuccess, error } = useMutation(renewCookie);

  useEffect(() => {
    // Periodically renew the cookie
    const intervalId = setInterval(() => {
      mutate();
      // console.log("Cookie Updated.", isError, isSuccess);
    }, interval);

    return () => clearInterval(intervalId);
  }, [mutate, interval]);

  return { isError, isSuccess, error };
};

export default useRenewCookie;
