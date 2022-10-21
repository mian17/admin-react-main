import ContentHeader from "../MainComponents/Content/ContentHeader";

import Pusher from "pusher-js";
import { useEffect, useState } from "react";
import apiClient from "../api";
import ChatBox from "../MainComponents/Content/MainContentModules/components/ChatBox/ChatBox";

const pusher = new Pusher("23dcf659521322c3c5c3", {
  cluster: "ap1",
});
const channel = pusher.subscribe("chat-channel");
const ChatContent = () => {
  const [currentUserUuid, setCurrentUserUuid] = useState("");
  const [recipientUserUuids, setRecipientUserUuids] = useState([]);
  const [messages, setMessages] = useState([]);
  Pusher.logToConsole = true;

  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem("personalAccessToken"));
    apiClient
      .get("api/user/account/profile", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        setCurrentUserUuid(response.data.user.uuid);
      })
      .catch((error) => {
        console.log(error);
      });

    channel.bind("create-chat-room", function (data) {
      const eventUuid = data.uuid;

      setRecipientUserUuids((prevState) => {
        if (prevState.includes(eventUuid)) {
          return [...prevState];
        }

        return [...prevState, eventUuid];
      });
      channel.bind(eventUuid, function (data) {
        // console.log(data);

        setMessages((prevState) => {
          if (
            JSON.stringify(prevState[prevState.length - 1]) ===
            JSON.stringify(data)
          ) {
            return [...prevState];
          }
          return [...prevState, data];
        });
      });
      // channel.bind("my-event", function (data) {
      // setMessages([...messages, { content: data.content, uuid: data.uuid }]);
    });
  }, [currentUserUuid, recipientUserUuids]);

  return (
    <>
      <div className="content-wrapper">
        <ContentHeader name="Hỗ trợ Chat" />

        {/*<div className="card-body">*/}
        <div className="container-fluid">
          <div className="row">
            {recipientUserUuids.map((recipientUuid) => {
              // const recipientUuid =

              return (
                <ChatBox
                  recipientUuid={recipientUuid}
                  currentUserUuid={currentUserUuid}
                  key={recipientUuid}
                />
              );
            })}
          </div>
        </div>
        {/*</div>*/}

        <section className="col-lg-12"></section>
      </div>
    </>
  );
};
export default ChatContent;
