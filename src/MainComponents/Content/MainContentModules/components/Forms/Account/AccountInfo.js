import classes from "./AccountInfo.module.css";

const AccountInfo = () => {
  return (
    <div className="card card-primary">
      <div className="card-header">
        <h3 className="card-title">Thông tin người đăng nhập</h3>
      </div>

      <form>
        <div className="card-body">
          <div className="form-group">
            <div className={classes["account-info-tab"]}>
              <h6>Tên nhân viên</h6>
              <p>admin</p>
            </div>
          </div>
          <div className="form-group">
            <div className={classes["account-info-tab"]}>
              <h6>Mã nhân viên</h6>
              <p>admin</p>
            </div>
          </div>
          <div className="form-group">
            <div className={classes["account-info-tab"]}>
              <h6>Mật khẩu</h6>
              <button className="btn btn-primary">
                <i
                  style={{ marginRight: "0.8rem" }}
                  className="fas fa-exchange-alt"
                ></i>
                Đổi mật khẩu
              </button>
            </div>
          </div>
          <div className="form-group">
            <div className={classes["account-info-tab"]}>
              <h6>Email</h6>
              <p>admin@admin.com</p>
            </div>
          </div>
          <div className="form-group">
            <div className={classes["account-info-tab"]}>
              <h6>Nhóm người sử dụng</h6>
              <div className={classes.font}>
                <span className="badge badge-primary">
                  <i className="fas fa-user"></i> Admin
                </span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default AccountInfo;
