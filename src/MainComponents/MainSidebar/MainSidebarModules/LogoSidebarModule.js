import classes from "./LogoSidebarModule.module.css";

const LogoSidebarModule = () => {
  return (
    <a href="/admin" className="brand-link">
      <img
        src="/asset/img/brand/shop-logo.png"
        alt=""
        className={"brand-image img-circle elevation-3 " + classes["logo"]}
      />
      <span className="brand-text font-weight-light">Wieder_ Markt</span>
    </a>
  );
};
export default LogoSidebarModule;
