const LogIn = () => {
  return (
    <div className="login-box">
      <div className="card card-outline card-primary">
        <div className="card-header text-center">
          <a href="/#" className="h1">
            <b>Admin</b>LTE
          </a>
        </div>
        <div className="card-body">
          <p className="login-box-msg">Vui lòng đăng nhập</p>

          <form action="/#" method="post">
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
            <div className="input-group mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Mật khẩu"
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-lock"></span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-7">
                <div className="icheck-primary text-left">
                  <input type="checkbox" id="remember" />
                  <label for="remember">Ghi nhớ tôi</label>
                </div>
              </div>

              <div className="col-5">
                <button type="submit" className="btn btn-primary btn-block">
                  Đăng nhập
                </button>
              </div>
            </div>
          </form>

          <div className="social-auth-links text-center mt-2 mb-3">
            <a href="/#" className="btn btn-block btn-primary">
              <i className="fab fa-facebook mr-2"></i> Đăng nhập bằng Facebook
            </a>
            <a href="/#" className="btn btn-block btn-danger">
              <i className="fab fa-google-plus mr-2"></i> Đăng nhập bằng Google+
            </a>
          </div>

          <p className="mb-1">
            <a href="/#">Quên mật khẩu</a>
          </p>
          <p className="mb-0">
            <a href="/#" className="text-center">
              Đăng ký tài khoản mới
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
export default LogIn;
