import { NavLink } from "react-router-dom";

const GeneralNavComponent = (props) => {
  return (
    <li className="nav-item">
      <NavLink to={props.toForNavLink} className="nav-link">
        <i className={`nav-icon ${props.icon}`}></i>
        <p>{props.label}</p>
      </NavLink>
    </li>
  );
};
export default GeneralNavComponent;
