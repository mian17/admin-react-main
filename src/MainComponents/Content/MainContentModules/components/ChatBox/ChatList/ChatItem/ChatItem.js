const ChatItem = (props) => {
  return (
    <li className="p-2 border-bottom">
      <a href="/#" className="d-flex justify-content-between">
        <div className="d-flex flex-row">
          <div>
            <img
              src={props.profileUrl}
              alt="avatar"
              className="d-flex align-self-center me-3  mr-2"
              width="60"
              style={{ borderRadius: "50%" }}
            />
            <span className="badge bg-success badge-dot"></span>
          </div>
          <div className="pt-1">
            <p className="fw-bold mb-0">{props.name}</p>
            <p className="small text-muted">{props.latestMessage}</p>
          </div>
        </div>
        {/*<div className="pt-1">*/}
        {/*  <p className="small text-muted mb-1">Just now</p>*/}
        {/*  <span className="badge bg-danger rounded-pill float-end">3</span>*/}
        {/*</div>*/}
      </a>
    </li>
  );
};
export default ChatItem;
