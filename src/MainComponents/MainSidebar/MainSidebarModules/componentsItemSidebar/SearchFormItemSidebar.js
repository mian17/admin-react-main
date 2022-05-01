const SearchFormItemSidebar = () => {
  return (
    <div className="form-inline">
      <div className="input-group" data-widget="sidebar-search">
        <input
          className="form-control form-control-sidebar"
          type="search"
          placeholder="Tìm kiếm"
          aria-label="Tìm kiếm"
        />
        <div className="input-group-append">
          <button className="btn btn-sidebar">
            <i className="fas fa-search fa-fw"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
export default SearchFormItemSidebar;
