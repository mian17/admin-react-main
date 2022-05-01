const GeneralNavComponent = (props) => {
  return (
    <li className="nav-item">
      <a href="index.html" className="nav-link">
        <i className={`nav-icon ${props.icon}`}></i>
        <p>{props.label}</p>
      </a>
    </li>
  );
};
export default GeneralNavComponent;
