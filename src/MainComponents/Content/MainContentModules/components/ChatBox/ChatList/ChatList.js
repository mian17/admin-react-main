import ChatItem from "./ChatItem/ChatItem";

const ChatList = () => {
  return (
    <div className="col-sm-4 overflow-auto">
      <div className="p-3">
        <div
          data-mdb-perfect-scrollbar="true"
          style={{ position: "relative", height: "480px" }}
        >
          <ul className="list-unstyled mb-0">
            <ChatItem
              profileUrl="http://127.0.0.1:8000/img/avatar/default-avatar.png"
              name="Test Test"
              latestMessage="hi"
            />
            <ChatItem
              profileUrl="http://127.0.0.1:8000/img/avatar/default-avatar.png"
              name="Test Test"
              latestMessage="hi"
            />
          </ul>
        </div>
      </div>
    </div>
  );
};
export default ChatList;
