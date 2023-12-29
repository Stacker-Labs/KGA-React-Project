import { useSetRecoilState } from "recoil";
import { userState } from "../recoil/userState";
import axios from "axios";

export const useUpdateUserState = () => {
  const setUserData = useSetRecoilState(userState);

  const updateUser = async (_id) => {
    const host = `${process.env.REACT_APP_API_SERVER}/users/${_id}`;
    // console.log(host);
    try {
      const response = await axios.get(host);
      //   console.log(response);
      setUserData(response.data.user);
      //   console.log(response.data.user);
    } catch (e) {
      console.log(e);
    }
  };

  return updateUser;
};
