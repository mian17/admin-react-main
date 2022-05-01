const CardDirectChat = () => {
  return (
    <div className="card direct-chat direct-chat-primary">
      <div className="card-header">
        <h3 className="card-title">Direct Chat</h3>

        <div className="card-tools">
          <span title="3 New Messages" className="badge badge-primary">
            3
          </span>
          <button
            type="button"
            className="btn btn-tool"
            data-card-widget="collapse"
          >
            <i className="fas fa-minus"></i>
          </button>
          <button
            type="button"
            className="btn btn-tool"
            title="Contacts"
            data-widget="chat-pane-toggle"
          >
            <i className="fas fa-comments"></i>
          </button>
          <button
            type="button"
            className="btn btn-tool"
            data-card-widget="remove"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      </div>
      <div className="card-body">
        <div className="direct-chat-messages">
          <div className="direct-chat-msg">
            <div className="direct-chat-infos clearfix">
              <span className="direct-chat-name float-left">
                Alexander Pierce
              </span>
              <span className="direct-chat-timestamp float-right">
                23 Jan 2:00 pm
              </span>
            </div>
            <img
              className="direct-chat-img"
              src="dist/img/user1-128x128.jpg"
              alt="message user"
            />
            <div className="direct-chat-text">
              Is this template really for free? That's unbelievable!
            </div>
          </div>

          <div className="direct-chat-msg right">
            <div className="direct-chat-infos clearfix">
              <span className="direct-chat-name float-right">
                Sarah Bullock
              </span>
              <span className="direct-chat-timestamp float-left">
                23 Jan 2:05 pm
              </span>
            </div>
            <img
              className="direct-chat-img"
              src="dist/img/user3-128x128.jpg"
              alt="message user"
            />
            <div className="direct-chat-text">You better believe it!</div>
          </div>

          <div className="direct-chat-msg">
            <div className="direct-chat-infos clearfix">
              <span className="direct-chat-name float-left">
                Alexander Pierce
              </span>
              <span className="direct-chat-timestamp float-right">
                23 Jan 5:37 pm
              </span>
            </div>
            <img
              className="direct-chat-img"
              src="dist/img/user1-128x128.jpg"
              alt="message user"
            />
            <div className="direct-chat-text">
              Working with AdminLTE on a great new app! Wanna join?
            </div>
          </div>

          <div className="direct-chat-msg right">
            <div className="direct-chat-infos clearfix">
              <span className="direct-chat-name float-right">
                Sarah Bullock
              </span>
              <span className="direct-chat-timestamp float-left">
                23 Jan 6:10 pm
              </span>
            </div>
            <img
              className="direct-chat-img"
              src="dist/img/user3-128x128.jpg"
              alt="message user"
            />
            <div className="direct-chat-text">I would love to.</div>
          </div>
        </div>

        <div className="direct-chat-contacts">
          <ul className="contacts-list">
            <li>
              <a href="/#">
                <img
                  className="contacts-list-img"
                  src="dist/img/user1-128x128.jpg"
                  alt="User Avatar"
                />

                <div className="contacts-list-info">
                  <span className="contacts-list-name">
                    Count Dracula
                    <small className="contacts-list-date float-right">
                      2/28/2015
                    </small>
                  </span>
                  <span className="contacts-list-msg">
                    How have you been? I was...
                  </span>
                </div>
              </a>
            </li>
            <li>
              <a href="/#">
                <img
                  className="contacts-list-img"
                  src="dist/img/user7-128x128.jpg"
                  alt="User Avatar"
                />

                <div className="contacts-list-info">
                  <span className="contacts-list-name">
                    Sarah Doe
                    <small className="contacts-list-date float-right">
                      2/23/2015
                    </small>
                  </span>
                  <span className="contacts-list-msg">
                    I will be waiting for...
                  </span>
                </div>
              </a>
            </li>
            <li>
              <a href="/#">
                <img
                  className="contacts-list-img"
                  src="dist/img/user3-128x128.jpg"
                  alt="User Avatar"
                />

                <div className="contacts-list-info">
                  <span className="contacts-list-name">
                    Nadia Jolie
                    <small className="contacts-list-date float-right">
                      2/20/2015
                    </small>
                  </span>
                  <span className="contacts-list-msg">
                    I'll call you back at...
                  </span>
                </div>
              </a>
            </li>
            <li>
              <a href="/#">
                <img
                  className="contacts-list-img"
                  src="dist/img/user5-128x128.jpg"
                  alt="User Avatar"
                />

                <div className="contacts-list-info">
                  <span className="contacts-list-name">
                    Nora S. Vans
                    <small className="contacts-list-date float-right">
                      2/10/2015
                    </small>
                  </span>
                  <span className="contacts-list-msg">
                    Where is your new...
                  </span>
                </div>
              </a>
            </li>
            <li>
              <a href="/#">
                <img
                  className="contacts-list-img"
                  src="dist/img/user6-128x128.jpg"
                  alt="User Avatar"
                />

                <div className="contacts-list-info">
                  <span className="contacts-list-name">
                    John K.
                    <small className="contacts-list-date float-right">
                      1/27/2015
                    </small>
                  </span>
                  <span className="contacts-list-msg">
                    Can I take a look at...
                  </span>
                </div>
              </a>
            </li>
            <li>
              <a href="/#">
                <img
                  className="contacts-list-img"
                  src="dist/img/user8-128x128.jpg"
                  alt="User Avatar"
                />

                <div className="contacts-list-info">
                  <span className="contacts-list-name">
                    Kenneth M.
                    <small className="contacts-list-date float-right">
                      1/4/2015
                    </small>
                  </span>
                  <span className="contacts-list-msg">
                    Never mind I found...
                  </span>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="card-footer">
        <form action="#" method="post">
          <div className="input-group">
            <input
              type="text"
              name="message"
              placeholder="Type Message ..."
              className="form-control"
            />
            <span className="input-group-append">
              <button type="button" className="btn btn-primary">
                Send
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CardDirectChat;
