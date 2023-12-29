import axios from "axios";
import React, { useEffect, useState } from "react";
import { No_Profile } from "../../images";
import { Link } from "react-router-dom";
import DateTime from "../../components/molecules/DateTime";
import { cn } from "../../utils/cn";

const MainAdmin = () => {
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    const userListData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_SERVER}/admin`
        );
        setUserList(response.data);
      } catch (error) {
        console.log(`error :`, error);
      }
    };

    userListData();
  }, []);

  return (
    <div className={cn("w-10/12 mx-auto py-5", "tablet:w-full px-5")}>
      <div className="flex justify-between items-center py-5">
        <div className="font-logo text-3xl ">User List</div>
        <div className="text-xl">Total User : {userList.length}명</div>
      </div>

      <table className="w-full table-auto">
        <thead>
          <tr className="border-b h-[50px] tablet:w-full text-lg">
            <th className="w-1/12">ID</th>
            <th className="w-1/12">Image</th>
            <th className="w-3/12">User Name</th>
            <th className="w-2/12">Nickname</th>
            <th className="w-1/12">Provider</th>
            <th className="w-1/12">Role</th>
            <th className="w-3/12">CreatedAt</th>
            <th className="w-1/12">Delete</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((item, index) => {
            return (
              <tr key={index} className="text-center border-b h-[60px]">
                <td>{item.id}</td>
                <td>
                  <Link to={`/users/${item.id}`}>
                    <img
                      src={item.image || No_Profile}
                      className="w-[50px] h-[50px] rounded-3xl m-auto"
                      alt=""
                    />
                  </Link>
                </td>
                <td>
                  <Link to={`/users/${item.id}`}>{item.username}</Link>
                </td>
                <td>
                  <Link to={`/users/${item.id}`}>{item.nickname}</Link>
                </td>
                <td>{item.provider}</td>
                <td>{item.role}</td>
                <td>
                  <DateTime dateString={item.createdAt} />
                </td>
                <td>❌</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MainAdmin;
