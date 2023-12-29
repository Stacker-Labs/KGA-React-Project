import { useSetRecoilState } from "recoil";
import { userState } from "../recoil/userState";
import axios from "axios";

export const useUpdateUserState = () => {
  const setUserData = useSetRecoilState(userState);

  const updateUser = async () => {
    const host = `${process.env.REACT_APP_API_SERVER}/users`;
    const options = {
      withCredentials: true,
    };
    // console.log(host);
    try {
      const response = await axios.get(host, options);
      console.log(response);
      setUserData(response.data);
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  return updateUser;
};
