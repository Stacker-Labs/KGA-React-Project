import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { userState } from "../recoil/userState";
import axios from "axios";

const useRenewCookie = (interval = 3550000) => {
  const userData = useRecoilValue(userState);

  const renewCookie = async () => {
    if (!userData.user.id) return false;
    try {
      console.log("Cookie Renewal Request awaiting...");
      const response = await axios.get(
        `${process.env.REACT_APP_API_SERVER}/users`,
        {
          withCredentials: true,
        }
      );
      console.log("Cookie Renewal Requested");
      const result = response.data;
      console.log(result);
      return result;
    } catch (e) {
      console.log(e);
    }
  };

  const { isError, isSuccess, error, data } = useQuery({
    queryKey: ["key"],
    queryFn: renewCookie,
    refetchInterval: interval,
  });
};

export default useRenewCookie;
