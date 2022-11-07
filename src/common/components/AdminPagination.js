const AdminPagination = ({
  firstPageHandler,
  previousPageHandler,
  currentPage,
  lastPage,
  changePageOnClickedValue,
  nextPageHandler,
  lastPageHandler,
}) => {
  return (
    <ul className="pagination justify-content-center mt-2">
      <li className="page-item" onClick={firstPageHandler}>
        <button className="page-link">&laquo;</button>
      </li>
      <li className="page-item" onClick={previousPageHandler}>
        <button className="page-link" aria-label="Previous">
          <span aria-hidden="true">&larr;</span>
          <span className="sr-only">Previous</span>
        </button>
      </li>

      {currentPage > 2 && (
        <li className="page-item">
          <button className="page-link" disabled>
            ...
          </button>
        </li>
      )}
      {Array.from(Array(lastPage), (e, i) => {
        return (
          <div key={i}>
            {i >= currentPage - 2 && i <= currentPage + 2 && (
              <li
                className={`page-item ${
                  Number(currentPage) === i + 1 ? "active" : ""
                }`}
              >
                <button
                  onClick={changePageOnClickedValue}
                  className="page-link"
                  value={i + 1}
                >
                  {i + 1}
                </button>
              </li>
            )}
          </div>
        );
      })}
      {currentPage < lastPage - 3 && (
        <li className="page-item">
          <button className="page-link" disabled>
            ...
          </button>
        </li>
      )}
      <li className="page-item" onClick={nextPageHandler}>
        <button className="page-link" aria-label="Next">
          <span aria-hidden="true">&rarr;</span>
          <span className="sr-only">Next</span>
        </button>
      </li>
      <li className="page-item" onClick={lastPageHandler}>
        <button className="page-link">&raquo;</button>
      </li>
    </ul>
  );
};
export default AdminPagination;
