import ChatSpace from "./ChatSpace/ChatSpace";
import { useCallback, useEffect, useState } from "react";
import apiClient from "../../../../../api";

const ChatBox = (props) => {
  const [name, setName] = useState("");
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
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }, [props.recipientUuid]);
  useEffect(() => {
    fetchCurrentChatWithUser();
  }, [fetchCurrentChatWithUser]);
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
          recipientUuid={props.recipientUuid}
        />
      </div>
    </div>
  );
};
export default ChatBox;
