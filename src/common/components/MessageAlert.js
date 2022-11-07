import MessageContext from "../../store/message-context";
import { useContext } from "react";
import Message from "../utils/Message";

const MessageAlert = ({ variant, content }) => {
  const { setMessage } = useContext(MessageContext);

  return (
    <div
      className={`alert alert-${variant} alert-dismissible fade show`}
      role="alert"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        zIndex: 9999,
        marginBottom: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      }}
    >
      {content}
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close"
        onClick={() => {
          setMessage(new Message());
        }}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};
export default MessageAlert;
