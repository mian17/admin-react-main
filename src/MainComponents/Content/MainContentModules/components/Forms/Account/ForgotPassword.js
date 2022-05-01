const ForgotPassword = () => {
  return (
    <div className="login-box">
      <div className="card card-outline card-primary">
        <div className="card-header text-center">
          <a href="/#" className="h1">
            <b>Admin</b>LTE
          </a>
        </div>
        <div className="card-body">
          <p className="login-box-msg">
            Bạn quên mật khẩu? Hãy nhập email bạn dùng để đăng ký.
          </p>
          <form action="recover-password.html" method="post">
            <div className="input-group mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-envelope"></span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <button type="submit" className="btn btn-primary btn-block">
                  Nhận mật khẩu mới
                </button>
              </div>
            </div>
          </form>
          <p className="mt-3 mb-1">
            <a href="/#">Đăng nhập</a>
          </p>
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;
