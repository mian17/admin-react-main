import MessageContext from "./message-context";

import { useState } from "react";
import Message from "../common/utils/Message";

const MessageProvider = (props) => {
  const [message, setMessage] = useState(new Message());

  /////////////////////////////////////////
  // SETTING CONTEXT'S VALUES
  const messageContext = {
    hasMessage: message.hasMessage,

    content: message.content,
    variant: message.variant,
    setMessage,
  };

  return (
    <MessageContext.Provider value={messageContext}>
      {props.children}
    </MessageContext.Provider>
  );
};
export default MessageProvider;
