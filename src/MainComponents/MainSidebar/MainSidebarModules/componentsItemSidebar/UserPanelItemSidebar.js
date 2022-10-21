import { useCallback, useEffect, useState } from "react";
import apiClient from "../../../../api";
import { backendServerPath } from "../../../../utilities/backendServerPath";

const UserPanelItemSidebar = () => {
  const [userInfo, setUserInfo] = useState({ avatar: "", name: "" });

  const fetchUserInfo = useCallback(async () => {
    try {
      const userToken = JSON.parse(localStorage.getItem("personalAccessToken"));

      await apiClient.get("/sanctum/csrf-cookie");
      const response = await apiClient.get("/api/user/account/profile", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });

      // console.log(response);
      const { avatar, name } = response.data.user;
      // console.log(avatar, name);
      setUserInfo({ avatar: backendServerPath + avatar, name: name });
    } catch (error) {
      console.log(error.response.data.message);
    }
  }, []);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  return (
    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
      <div className="image">
        <img
          src={userInfo.avatar}
          className="img-circle elevation-2"
          alt={userInfo.name}
        />
      </div>
      <div className="info">
        <a href="/#" className="d-block">
          {userInfo.name}
        </a>
      </div>
    </div>
  );
};

export default UserPanelItemSidebar;
