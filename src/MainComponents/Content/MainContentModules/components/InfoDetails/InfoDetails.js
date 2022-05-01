const InfoDetails = (props) => {
  return (
    <div className="col-lg-3 col-6">
      <div className={`small-box ${props.bootstrapBackground}`}>
        <div className="inner">
          <h3>
            {props.num}
            {props.unit ? (
              <sup style={{ fontSize: "20px" }}>{props.unit}</sup>
            ) : (
              ""
            )}
          </h3>

          <p>{props.labelDataType}</p>
        </div>
        <div className="icon">
          <i className={`${props.icon}`}></i>
        </div>
        <a href="/#" className="small-box-footer">
          Xem thêm <i className="fas fa-arrow-circle-right"></i>
        </a>
      </div>
    </div>
  );
};
export default InfoDetails;
