import React from "react";

const MessageContext = React.createContext({
  hasMesssage: false,

  content: "",
  variant: "",
  setMessage: () => {},
});
export default MessageContext;
