const ChatBubbleSelf = (props) => {
  return (
    <div
      className="d-flex flex-row justify-content-end align-items-center"
      style={{ gap: 4 }}
    >
      <div>
        <p
          className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary"
          style={{ borderRadius: "13px" }}
        >
          {props.message}
        </p>
      </div>
      <img
        src={props.profileUrl}
        alt="avatar 1"
        style={{ width: "45px", height: "100%", borderRadius: "50%" }}
      />
    </div>
  );
};
export default ChatBubbleSelf;
