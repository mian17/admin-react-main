const CardCalender = () => {
  return (
    <div className="card bg-gradient-success">
      <div className="card-header border-0">
        <h3 className="card-title">
          <i className="far fa-calendar-alt"></i>
          Calendar
        </h3>
        <div className="card-tools">
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-success btn-sm dropdown-toggle"
              data-toggle="dropdown"
              data-offset="-52"
            >
              <i className="fas fa-bars"></i>
            </button>
            <div className="dropdown-menu" role="menu">
              <a href="/#" className="dropdown-item">
                Add new event
              </a>
              <a href="/#" className="dropdown-item">
                Clear events
              </a>
              <div className="dropdown-divider"></div>
              <a href="/#" className="dropdown-item">
                View calendar
              </a>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-success btn-sm"
            data-card-widget="collapse"
          >
            <i className="fas fa-minus"></i>
          </button>
          <button
            type="button"
            className="btn btn-success btn-sm"
            data-card-widget="remove"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      </div>
      <div className="card-body pt-0">
        <div id="calendar" style={{ width: "100%" }}></div>
      </div>
    </div>
  );
};

export default CardCalender;
