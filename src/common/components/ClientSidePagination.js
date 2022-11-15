const ClientSidePagination = ({
  previousPage,
  canPreviousPage,
  pageIndex,
  pageOptions,
  nextPage,
  canNextPage,
}) => {
  return (
    <>
      <button
        className="btn btn-outline-primary"
        onClick={previousPage}
        disabled={!canPreviousPage}
      >
        {"<"}
      </button>
      <button className="btn">
        Trang {pageIndex + 1} trên {pageOptions.length}
      </button>
      <button
        className="btn btn-outline-primary"
        onClick={nextPage}
        disabled={!canNextPage}
      >
        {">"}
      </button>
    </>
  );
};
export default ClientSidePagination;
