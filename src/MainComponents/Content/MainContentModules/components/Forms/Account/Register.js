const Register = () => {
  return (
    <div className="register-box">
      <div className="card card-outline card-primary">
        <div className="card-header text-center">
          <a href="/#" className="h1">
            <b>Admin</b>LTE
          </a>
        </div>
        <div className="card-body">
          <p className="login-box-msg">Đăng ký tài khoản mới</p>

          <form action="/#" method="post">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Họ và tên"
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-user"></span>
                </div>
              </div>
            </div>
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
            <div className="input-group mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Nhập lại mật khẩu"
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-lock"></span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-8">
                <div className="icheck-primary">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    name="terms"
                    value="agree"
                  />
                  <label for="agreeTerms">
                    Tôi đồng ý <a href="#">điều khoản</a>
                  </label>
                </div>
              </div>

              <div className="col-4">
                <button type="submit" className="btn btn-primary btn-block">
                  Đăng ký
                </button>
              </div>
            </div>
          </form>

          <div className="social-auth-links text-center">
            <a href="/#" className="btn btn-block btn-primary">
              <i className="fab fa-facebook mr-2"></i>
              Đăng nhập bằng Facebook
            </a>
            <a href="/#" className="btn btn-block btn-danger">
              <i className="fab fa-google-plus mr-2"></i>
              Đăng nhập bằng Google+
            </a>
          </div>

          <a href="/#" className="text-center">
            Tôi đã có tài khoản
          </a>
        </div>
      </div>
    </div>
  );
};
export default Register;
