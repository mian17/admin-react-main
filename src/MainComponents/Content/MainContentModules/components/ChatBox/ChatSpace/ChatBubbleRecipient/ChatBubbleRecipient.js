const ChatBubbleRecipient = (props) => {
  return (
    <div
      className="d-flex flex-row justify-content-start align-items-center"
      style={{ gap: 4 }}
    >
      <img
        src={props.profileUrl}
        alt="avatar 1"
        style={{ width: "45px", height: "100%", borderRadius: "50%" }}
      />
      <div>
        <p
          className="small p-2 ms-3 mb-1 rounded-3"
          style={{ backgroundColor: "#f5f6f7", borderRadius: "13px" }}
        >
          {props.message}
        </p>
      </div>
    </div>
  );
};
export default ChatBubbleRecipient;
