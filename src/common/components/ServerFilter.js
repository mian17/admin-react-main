const ServerFilter = ({ filter, filterChangeHandler }) => {
  return (
    <span>
      <strong className="mr-2">Tìm kiếm</strong>
      <input value={filter || ""} onChange={filterChangeHandler} />
    </span>
  );
};
export default ServerFilter;
