import { useContext } from "react";
import AuthContext from "../../store/auth-context";

const Navbar = () => {
  const { setLoggedOut } = useContext(AuthContext);
  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a
            className="nav-link"
            data-widget="pushmenu"
            href="/#"
            role="button"
          >
            <i className="fas fa-bars"></i>
          </a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <a href="/" className="nav-link">
            Trang chủ
          </a>
        </li>
        {/*<li className="nav-item d-none d-sm-inline-block">*/}
        {/*  <a href="/#" className="nav-link">*/}
        {/*    Liên hệ*/}
        {/*  </a>*/}
        {/*</li>*/}
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            href="/#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Tài khoản
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <button
              className="dropdown-item"
              // href="/#"
              onClick={setLoggedOut}
            >
              Đăng xuất
            </button>
            {/*<a className="dropdown-item" href="/#">*/}
            {/*  Support*/}
            {/*</a>*/}
            {/*<div className="dropdown-divider"></div>*/}
            {/*<a className="dropdown-item" href="/#">*/}
            {/*  Contact*/}
            {/*</a>*/}
          </div>
        </li>
      </ul>

      <ul className="navbar-nav ml-auto">
        {/*<li className="nav-item">*/}
        {/*  <a*/}
        {/*    className="nav-link"*/}
        {/*    data-widget="navbar-search"*/}
        {/*    href="/#"*/}
        {/*    role="button"*/}
        {/*  >*/}
        {/*    <i className="fas fa-search"></i>*/}
        {/*  </a>*/}
        {/*  <div className="navbar-search-block">*/}
        {/*    <form className="form-inline">*/}
        {/*      <div className="input-group input-group-sm">*/}
        {/*        <input*/}
        {/*          className="form-control form-control-navbar"*/}
        {/*          type="search"*/}
        {/*          placeholder="Tìm kiếm"*/}
        {/*          aria-label="Tìm kiếm"*/}
        {/*        />*/}
        {/*        <div className="input-group-append">*/}
        {/*          <button className="btn btn-navbar" type="submit">*/}
        {/*            <i className="fas fa-search"></i>*/}
        {/*          </button>*/}
        {/*          <button*/}
        {/*            className="btn btn-navbar"*/}
        {/*            type="button"*/}
        {/*            data-widget="navbar-search"*/}
        {/*          >*/}
        {/*            <i className="fas fa-times"></i>*/}
        {/*          </button>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*    </form>*/}
        {/*  </div>*/}
        {/*</li>*/}

        {/*<li className="nav-item dropdown">*/}
        {/*  <a className="nav-link" data-toggle="dropdown" href="/#">*/}
        {/*    <i className="far fa-comments"></i>*/}
        {/*    <span className="badge badge-danger navbar-badge">3</span>*/}
        {/*  </a>*/}
        {/*  <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">*/}
        {/*    <a href="/#" className="dropdown-item">*/}
        {/*      <div className="media">*/}
        {/*        <img*/}
        {/*          src="dist/img/user1-128x128.jpg"*/}
        {/*          alt="User Avatar"*/}
        {/*          className="img-size-50 mr-3 img-circle"*/}
        {/*        />*/}
        {/*        <div className="media-body">*/}
        {/*          <h3 className="dropdown-item-title">*/}
        {/*            Brad Diesel*/}
        {/*            <span className="float-right text-sm text-danger">*/}
        {/*              <i className="fas fa-star"></i>*/}
        {/*            </span>*/}
        {/*          </h3>*/}
        {/*          <p className="text-sm">Gọi tôi để bàn công việc ...</p>*/}
        {/*          <p className="text-sm text-muted">*/}
        {/*            <i className="far fa-clock mr-1"></i> 4 tiếng trước*/}
        {/*          </p>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*    </a>*/}
        {/*    <div className="dropdown-divider"></div>*/}
        {/*    <a href="/#" className="dropdown-item">*/}
        {/*      <div className="media">*/}
        {/*        <img*/}
        {/*          src="dist/img/user8-128x128.jpg"*/}
        {/*          alt="User Avatar"*/}
        {/*          className="img-size-50 img-circle mr-3"*/}
        {/*        />*/}
        {/*        <div className="media-body">*/}
        {/*          <h3 className="dropdown-item-title">*/}
        {/*            John Pierce*/}
        {/*            <span className="float-right text-sm text-muted">*/}
        {/*              <i className="fas fa-star"></i>*/}
        {/*            </span>*/}
        {/*          </h3>*/}
        {/*          <p className="text-sm">Tôi nhận được email rồi</p>*/}
        {/*          <p className="text-sm text-muted">*/}
        {/*            <i className="far fa-clock mr-1"></i> 4 tiếng trước*/}
        {/*          </p>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*    </a>*/}
        {/*    <div className="dropdown-divider"></div>*/}
        {/*    <a href="/#" className="dropdown-item">*/}
        {/*      <div className="media">*/}
        {/*        <img*/}
        {/*          src="dist/img/user3-128x128.jpg"*/}
        {/*          alt="User Avatar"*/}
        {/*          className="img-size-50 img-circle mr-3"*/}
        {/*        />*/}
        {/*        <div className="media-body">*/}
        {/*          <h3 className="dropdown-item-title">*/}
        {/*            Nora Silvester*/}
        {/*            <span className="float-right text-sm text-warning">*/}
        {/*              <i className="fas fa-star"></i>*/}
        {/*            </span>*/}
        {/*          </h3>*/}
        {/*          <p className="text-sm">Báo cáo bạn làm xong ...</p>*/}
        {/*          <p className="text-sm text-muted">*/}
        {/*            <i className="far fa-clock mr-1"></i> 4 tiếng trước*/}
        {/*          </p>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*    </a>*/}
        {/*    <div className="dropdown-divider"></div>*/}
        {/*    <a href="/#" className="dropdown-item dropdown-footer">*/}
        {/*      Xem thêm tin nhắn*/}
        {/*    </a>*/}
        {/*  </div>*/}
        {/*</li>*/}
        {/*<li className="nav-item dropdown">*/}
        {/*  <a className="nav-link" data-toggle="dropdown" href="/#">*/}
        {/*    <i className="far fa-bell"></i>*/}
        {/*    <span className="badge badge-warning navbar-badge">15</span>*/}
        {/*  </a>*/}
        {/*  <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">*/}
        {/*    <span className="dropdown-item dropdown-header">15 thông báo</span>*/}
        {/*    <div className="dropdown-divider"></div>*/}
        {/*    <a href="/#" className="dropdown-item">*/}
        {/*      <i className="fas fa-envelope mr-2"></i> 4 tin nhắn mới*/}
        {/*      <span className="float-right text-muted text-sm">3 phút</span>*/}
        {/*    </a>*/}
        {/*    <div className="dropdown-divider"></div>*/}
        {/*    <a href="/#" className="dropdown-item">*/}
        {/*      <i className="fas fa-users mr-2"></i> 8 lời mời kết bạn*/}
        {/*      <span className="float-right text-muted text-sm">12 tiếng</span>*/}
        {/*    </a>*/}
        {/*    <div className="dropdown-divider"></div>*/}
        {/*    <a href="/#" className="dropdown-item">*/}
        {/*      <i className="fas fa-file mr-2"></i> 3 bảng báo cáo mới*/}
        {/*      <span className="float-right text-muted text-sm">2 ngày</span>*/}
        {/*    </a>*/}
        {/*    <div className="dropdown-divider"></div>*/}
        {/*    <a href="/#" className="dropdown-item dropdown-footer">*/}
        {/*      Xem tất cả thông báo*/}
        {/*    </a>*/}
        {/*  </div>*/}
        {/*</li>*/}
        <li className="nav-item">
          <a
            className="nav-link"
            data-widget="fullscreen"
            href="/#"
            role="button"
          >
            <i className="fas fa-expand-arrows-alt"></i>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
