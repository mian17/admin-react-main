const FunctionalitiesDiv = (props) => {
  return (
    <div
      className={`d-flex ${
        props.hasNoSpaceBetween ? "" : "justify-content-between"
      }  align-items-center`}
      style={{
        gap: 2,
        justifyContent: props.hasNoSpaceBetween ? "space-evenly" : "",
      }}
    >
      {props.children}
    </div>
  );
};
export default FunctionalitiesDiv;
