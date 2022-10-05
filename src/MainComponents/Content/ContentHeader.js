const ContentHeader = (props) => {
  return (
    <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="mb-2">{props.name}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContentHeader;
