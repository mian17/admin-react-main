import GeneralNavComponent from "./navigationComponents/GeneralNavComponent";

// For icon please use Font Awesome 5 the free version
// https://fontawesome.com/v5/search
const generalComponents = [
  {
    id: 0,
    icon: "fas fa-tachometer-alt",
    label: "Trang chủ",
    path: "/",
  },
  { id: 1, icon: "fas fa-list", label: "Danh mục", path: "/category" },
  { id: 2, icon: "fas fa-box", label: "Sản phẩm", path: "/product" },
  {
    id: 3,
    icon: "fas fa-shopping-cart",
    label: "Đơn hàng",
    path: "/order",
  },
  { id: 4, icon: "fas fa-users", label: "Người dùng", path: "/user" },
  // { id: 4, icon: "fas fa-truck", label: "Nhập kho", path: "/enterstock" },
  // { id: 5, icon: "fas fa-warehouse", label: "Tồn kho" },
  // { id: 6, icon: "fas fa-truck-loading", label: "Doanh số" },
  // { id: 7, icon: "fas fa-file-alt", label: "Thu chi" },
  // { id: 8, icon: "fas fa-coins", label: "Lợi nhuận" },
  // { id: 9, icon: "fas fa-cog", label: "Thiết lập" },
];

const NavigationModule = () => (
  <nav className="mt-2">
    <ul
      className="nav nav-pills nav-sidebar flex-column"
      data-widget="treeview"
      role="menu"
      data-accordion="false"
    >
      {generalComponents.map((component) => (
        <GeneralNavComponent
          key={component.id}
          icon={component.icon}
          label={component.label}
          toForNavLink={component.path}
        />
      ))}

      <li className="nav-header">TEMPLATE TO CUT</li>
      <li className="nav-item">
        <a href="/#" className="nav-link">
          <i className="nav-icon fas fa-chart-pie"></i>
          <p>
            Charts
            <i className="right fas fa-angle-left"></i>
          </p>
        </a>
        <ul className="nav nav-treeview">
          <li className="nav-item">
            <a href="/pages/charts/chartjs.html" className="nav-link">
              <i className="far fa-circle nav-icon"></i>
              <p>ChartJS</p>
            </a>
          </li>
          <li className="nav-item">
            <a href="/pages/charts/flot.html" className="nav-link">
              <i className="far fa-circle nav-icon"></i>
              <p>Flot</p>
            </a>
          </li>
          <li className="nav-item">
            <a href="/pages/charts/inline.html" className="nav-link">
              <i className="far fa-circle nav-icon"></i>
              <p>Inline</p>
            </a>
          </li>
          <li className="nav-item">
            <a href="/pages/charts/uplot.html" className="nav-link">
              <i className="far fa-circle nav-icon"></i>
              <p>uPlot</p>
            </a>
          </li>
        </ul>
      </li>
      <li className="nav-item">
        <a href="/#" className="nav-link">
          <i className="nav-icon fas fa-tree"></i>
          <p>
            UI Elements
            <i className="fas fa-angle-left right"></i>
          </p>
        </a>
        <ul className="nav nav-treeview">
          <li className="nav-item">
            <a href="/pages/UI/general.html" className="nav-link">
              <i className="far fa-circle nav-icon"></i>
              <p>General</p>
            </a>
          </li>
          <li className="nav-item">
            <a href="/pages/UI/icons.html" className="nav-link">
              <i className="far fa-circle nav-icon"></i>
              <p>Icons</p>
            </a>
          </li>
          <li className="nav-item">
            <a href="/pages/UI/buttons.html" className="nav-link">
              <i className="far fa-circle nav-icon"></i>
              <p>Buttons</p>
            </a>
          </li>
          <li className="nav-item">
            <a href="/pages/UI/sliders.html" className="nav-link">
              <i className="far fa-circle nav-icon"></i>
              <p>Sliders</p>
            </a>
          </li>
          <li className="nav-item">
            <a href="/pages/UI/modals.html" className="nav-link">
              <i className="far fa-circle nav-icon"></i>
              <p>Modals & Alerts</p>
            </a>
          </li>
          <li className="nav-item">
            <a href="/pages/UI/navbar.html" className="nav-link">
              <i className="far fa-circle nav-icon"></i>
              <p>Navbar & Tabs</p>
            </a>
          </li>
          <li className="nav-item">
            <a href="/pages/UI/timeline.html" className="nav-link">
              <i className="far fa-circle nav-icon"></i>
              <p>Timeline</p>
            </a>
          </li>
          <li className="nav-item">
            <a href="/pages/UI/ribbons.html" className="nav-link">
              <i className="far fa-circle nav-icon"></i>
              <p>Ribbons</p>
            </a>
          </li>
        </ul>
      </li>
      <li className="nav-item">
        <a href="/#" className="nav-link">
          <i className="nav-icon fas fa-edit"></i>
          <p>
            Forms
            <i className="fas fa-angle-left right"></i>
          </p>
        </a>
        <ul className="nav nav-treeview">
          <li className="nav-item">
            <a href="/pages/forms/general.html" className="nav-link">
              <i className="far fa-circle nav-icon"></i>
              <p>General Elements</p>
            </a>
          </li>
          <li className="nav-item">
            <a href="/pages/forms/advanced.html" className="nav-link">
              <i className="far fa-circle nav-icon"></i>
              <p>Advanced Elements</p>
            </a>
          </li>
          <li className="nav-item">
            <a href="/pages/forms/editors.html" className="nav-link">
              <i className="far fa-circle nav-icon"></i>
              <p>Editors</p>
            </a>
          </li>
          <li className="nav-item">
            <a href="/pages/forms/validation.html" className="nav-link">
              <i className="far fa-circle nav-icon"></i>
              <p>Validation</p>
            </a>
          </li>
        </ul>
      </li>
      <li className="nav-item">
        <a href="/#" className="nav-link">
          <i className="nav-icon fas fa-table"></i>
          <p>
            Tables
            <i className="fas fa-angle-left right"></i>
          </p>
        </a>
        <ul className="nav nav-treeview">
          <li className="nav-item">
            <a href="/pages/tables/simple.html" className="nav-link">
              <i className="far fa-circle nav-icon"></i>
              <p>Simple Tables</p>
            </a>
          </li>
          <li className="nav-item">
            <a href="/pages/tables/data.html" className="nav-link">
              <i className="far fa-circle nav-icon"></i>
              <p>DataTables</p>
            </a>
          </li>
          <li className="nav-item">
            <a href="/pages/tables/jsgrid.html" className="nav-link">
              <i className="far fa-circle nav-icon"></i>
              <p>jsGrid</p>
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
);

export default NavigationModule;
