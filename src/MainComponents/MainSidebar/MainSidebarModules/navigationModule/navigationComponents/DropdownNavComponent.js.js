const DropdownNavComponent = () => {
  return (
    <li className="nav-item">
      <a href="/#" className="nav-link">
        <i className="nav-icon fas fa-copy"></i>
        <p>
          Layout Options
          <i className="fas fa-angle-left right"></i>
          <span className="badge badge-info right">6</span>
        </p>
      </a>
      <ul className="nav nav-treeview">
        <li className="nav-item">
          <a href="/pages/layout/top-nav.html" className="nav-link">
            <i className="far fa-circle nav-icon"></i>
            <p>Top Navigation</p>
          </a>
        </li>
        <li className="nav-item">
          <a href="/pages/layout/top-nav-sidebar.html" className="nav-link">
            <i className="far fa-circle nav-icon"></i>
            <p>Top Navigation + Sidebar</p>
          </a>
        </li>
        <li className="nav-item">
          <a href="/pages/layout/boxed.html" className="nav-link">
            <i className="far fa-circle nav-icon"></i>
            <p>Boxed</p>
          </a>
        </li>
        <li className="nav-item">
          <a href="/pages/layout/fixed-sidebar.html" className="nav-link">
            <i className="far fa-circle nav-icon"></i>
            <p>Fixed Sidebar</p>
          </a>
        </li>
        <li className="nav-item">
          <a
            href="/pages/layout/fixed-sidebar-custom.html"
            className="nav-link"
          >
            <i className="far fa-circle nav-icon"></i>
            <p>
              Fixed Sidebar <small>+ Custom Area</small>
            </p>
          </a>
        </li>
        <li className="nav-item">
          <a href="/pages/layout/fixed-topnav.html" className="nav-link">
            <i className="far fa-circle nav-icon"></i>
            <p>Fixed Navbar</p>
          </a>
        </li>
        <li className="nav-item">
          <a href="/pages/layout/fixed-footer.html" className="nav-link">
            <i className="far fa-circle nav-icon"></i>
            <p>Fixed Footer</p>
          </a>
        </li>
        <li className="nav-item">
          <a href="/pages/layout/collapsed-sidebar.html" className="nav-link">
            <i className="far fa-circle nav-icon"></i>
            <p>Collapsed Sidebar</p>
          </a>
        </li>
      </ul>
    </li>
  );
};
export default DropdownNavComponent;
