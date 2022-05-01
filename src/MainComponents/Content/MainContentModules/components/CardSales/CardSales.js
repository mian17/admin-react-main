const CardSales = () => {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">
          <i className="fas fa-chart-pie mr-1"></i>
          Biểu đồ doanh thu
        </h3>
        <div className="card-tools">
          <ul className="nav nav-pills ml-auto">
            <li className="nav-item">
              <a
                className="nav-link active"
                href="#revenue-chart"
                data-toggle="tab"
              >
                Khu vực
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#sales-chart" data-toggle="tab">
                Hình tròn
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="card-body">
        <div className="tab-content p-0">
          <div
            className="chart tab-pane active"
            id="revenue-chart"
            style={{ position: "relative", height: "300px" }}
          >
            <canvas
              id="revenue-chart-canvas"
              height="300"
              style={{ height: "300px" }}
            ></canvas>
          </div>
          <div
            className="chart tab-pane"
            id="sales-chart"
            style={{ position: "relative", height: "300px" }}
          >
            <canvas
              id="sales-chart-canvas"
              height="300"
              style={{ height: "300px" }}
            ></canvas>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CardSales;
