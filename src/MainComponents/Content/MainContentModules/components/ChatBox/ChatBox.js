import ChatSpace from "./ChatSpace/ChatSpace";
import { useCallback, useEffect, useState } from "react";
import apiClient from "../../../../../api";
import { backendServerPath } from "../../../../../utilities/backendServerPath";

const ChatBox = (props) => {
  const [name, setName] = useState("");
  const [recipientAvatarUrl, setRecipientAvatarUrl] = useState("");
  const [currentUserAvatarUrl, setCurrentUserAvatarUrl] = useState("");
  // const [messages, setMessages] = useState(props.messages);
  const userToken = JSON.parse(localStorage.getItem("personalAccessToken"));

  const fetchCurrentChatWithUser = useCallback(async () => {
    try {
      await apiClient.get("/sanctum/csrf-cookie");
      const response = await apiClient.get(
        `api/admin/user/${props.recipientUuid}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      setName(response.data.name);
      setRecipientAvatarUrl(backendServerPath + response.data.avatar);
      console.log(response);
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  }, [props.recipientUuid]); // CONSIDER TO UPDATE THIS DEPENDENCY

  const fetchCurrentUser = useCallback(async () => {
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
      const { avatar } = response.data.user;
      // console.log(avatar, name);
      console.log(backendServerPath + avatar);
      setCurrentUserAvatarUrl(backendServerPath + avatar);
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      alert(error.message);
    }
  }, []);
  useEffect(() => {
    fetchCurrentChatWithUser();
    fetchCurrentUser();
  }, [fetchCurrentChatWithUser, fetchCurrentUser]);
  return (
    <div className="col-6">
      <div className="card px-2">
        {/*<ChatList />*/}
        <div className="card-header">
          <h3 className="card-title">Chat với {name}</h3>
          <div className="card-tools">
            <button
              type="button"
              className="btn btn-tool"
              data-card-widget="remove"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>

        <ChatSpace
          currentUserUuid={props.currentUserUuid}
          currentUserAvatarUrl={currentUserAvatarUrl}
          recipientUuid={props.recipientUuid}
          recipientAvatarUrl={recipientAvatarUrl}
        />
      </div>
    </div>
  );
};
export default ChatBox;
