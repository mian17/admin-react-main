import { useState } from "react";
import apiClient from "../../../../../../../api";

const ChatInput = (props) => {
  const [message, setMessage] = useState("");

  const handleTextChange = (e) => {
    setMessage(e.target.value);
  };
  function sendMessage() {
    if (message.length > 0) {
      const userToken = JSON.parse(localStorage.getItem("personalAccessToken"));
      apiClient
        .post(
          "/api/admin-send-message",
          {
            content: message,
            uuid: props.recipientUuid,
            admin_uuid: props.currentUserUuid,
          },
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
              Accept: "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response);
          // props.getChatInputMessage(message);
        })
        .catch((error) => {
          console.log(error);
        });
      setMessage("");
    }
  }
  return (
    <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
      <input
        type="text"
        className="form-control form-control-lg"
        id="exampleFormControlInput2"
        placeholder="Aa"
        onChange={handleTextChange}
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            sendMessage();
          }
        }}
        value={message}
      />

      <button className="btn btn-primary ms-3 mx-3" onClick={sendMessage}>
        <i className="fas fa-paper-plane fa-lg"></i>
      </button>
    </div>
  );
};
export default ChatInput;
