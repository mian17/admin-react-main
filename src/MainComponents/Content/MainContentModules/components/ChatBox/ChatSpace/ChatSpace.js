import ChatInput from "./ChatInput/ChatInput";
import ChatBubbleRecipient from "./ChatBubbleRecipient/ChatBubbleRecipient";
import ChatBubbleSelf from "./ChatBubbleSelf/ChatBubbleSelf";
import { useEffect, useState } from "react";
import Pusher from "pusher-js";

const pusher = new Pusher("23dcf659521322c3c5c3", {
  cluster: "ap1",
});
const channel = pusher.subscribe("chat-channel");
const ChatSpace = (props) => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    channel.bind(props.recipientUuid, function (data) {
      // alert(JSON.stringify(data, null, 2));
      setMessages((prevState) => {
        return [...prevState, { content: data.content, uuid: data.uuid }];
      });
    });
  }, [props.recipientUuid]);

  // const getChatInputMessage = (value) => {
  //   console.log(value);
  // };

  // console.log(messages);

  return (
    <div className="overflow-auto p-2">
      <div
        className="pt-3 pe-3"
        data-mdb-perfect-scrollbar="true"
        style={{ position: "relative", height: "480px" }}
      >
        {messages.map((message, index) => {
          if (message.uuid === props.currentUserUuid) {
            return (
              <ChatBubbleSelf
                key={index}
                profileUrl={props.currentUserAvatarUrl}
                message={message.content}
              />
            );
          }
          return (
            <ChatBubbleRecipient
              key={index}
              profileUrl={props.recipientAvatarUrl}
              message={message.content}
            />
          );
        })}
      </div>

      <ChatInput
        currentUserUuid={props.currentUserUuid}
        recipientUuid={props.recipientUuid}
        // getChatInputMessage={getChatInputMessage}
      />
    </div>
  );
};
export default ChatSpace;
