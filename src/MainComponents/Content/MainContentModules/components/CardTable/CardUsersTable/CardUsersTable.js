import { useCallback, useEffect, useMemo, useState } from "react";
import {
  useExpanded,
  useGlobalFilter,
  useGroupBy,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { confirm } from "react-confirm-box";
import { confirmBoxOptions } from "../../../../../../common/utils/options";
import Button from "react-bootstrap/Button";
import { CSVLink } from "react-csv";
import GlobalFilter from "../../../../../../common/components/GlobalFilter";
import ModalUserDetails from "../../Forms/User/ModalUserDetails";
import apiClient from "../../../../../../api";
import UserInTable from "./cardUsersTable-utils/UserInTable";
import { formatMoney } from "../../../../../../common/utils/helperFunctions";

const CardUsersTable = () => {
  // Mã khách hàng, tên kh, điện thoại, địa chỉ, lần cuối mua hàng, tổng tiền hàng, tổng nợ, tính năng
  // Modal State
  const [show, setShow] = useState(false);
  // Modal Handlers
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // Editing product id state
  const [userUuid, setUserUuid] = useState(null);

  // React Table Handler

  const [data, setData] = useState(useMemo(() => [], []));
  const columns = useMemo(
    () => [
      {
        Header: "Uuid người dùng",
        accessor: "uuid", // accessor is the "key" in the data
      },
      {
        Header: "Họ và tên",
        accessor: "name",
      },
      {
        Header: "Số điện thoại",
        accessor: "phoneNumber",
      },
      {
        Header: "Địa chỉ",
        accessor: "address",
      },
      {
        Header: "Tổng tiền đã chi",
        accessor: "totalMoneySpent",

        Cell: ({ cell, row }) => {
          const totalMoneySpent = cell.row.values.totalMoneySpent;

          return (
            <>
              {!isNaN(totalMoneySpent)
                ? formatMoney(totalMoneySpent)
                : totalMoneySpent}
            </>
          );
        },
      },
      {
        Header: "Chức năng",
        accessor: "functions",

        Cell: ({ cell, row }) => {
          const rowValues = cell.row.values;
          const rowItemUuid = cell.row.values.uuid; // id from ProductInCart.js constructor
          // const rowItemId = row.index; // id from ProductInCart.js constructor
          return (
            <div>
              <button
                className="btn btn-success"
                onClick={() => copyInfoHandler(rowValues)}
              >
                <FontAwesomeIcon icon={solid("copy")} />
              </button>
              <button
                className="btn btn-warning"
                onClick={() => viewMoreInfo(rowItemUuid)}
              >
                <FontAwesomeIcon icon={solid("magnifying-glass")} />
              </button>
              <button
                className="btn btn-danger"
                onClick={() => moveToTrash(rowItemUuid)}
              >
                <FontAwesomeIcon icon={solid("trash-can")} />
              </button>
            </div>
          );
        },
      },
    ],
    []
  );
  function copyInfoHandler(valueObj) {
    let readyForClipboard = "";

    for (const property in valueObj) {
      if (property === "functions") continue;
      readyForClipboard += `${valueObj[property]}\t`;
    }
    navigator.clipboard.writeText(readyForClipboard).then(() => {
      alert("Đã copy nội dung hàng của bảng!");
    });
  }
  function viewMoreInfo(userUuid) {
    setUserUuid(userUuid);
    setShow(true);
  }
  async function moveToTrash(userUuid) {
    const result = await confirm(
      "Bạn có chắc chắn muốn xóa người dùng này?",
      confirmBoxOptions
    );
    if (result) {
      setData((prevState) =>
        prevState.filter((item) => item.uuid !== userUuid)
      );
      apiClient.get("/sanctum/csrf-cookie").then(() => {
        const userToken = JSON.parse(
          localStorage.getItem("personalAccessToken")
        );

        apiClient
          .get(`api/admin/user-to-tra/${userUuid}`, {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          })
          .then((response) => {
            alert(response.data.message);
          })
          .catch((error) => {
            if (error) {
              alert("Đã có lỗi xảy ra");
            }
          });
      });
    }
  }
  // const deleteBulkInfoHandler = async () => {
  //   // a variable from react table library
  //   const bulkId = selectedFlatRows.map((row) => row.original.id);
  //   console.log(bulkId);
  //
  //   const result = await confirm(
  //     "Bạn có chắc chắn muốn xóa các người dùng này?",
  //     confirmBoxOptions
  //   );
  //   if (result) {
  //     setData((prevState) => {
  //       return prevState.filter((item) => !bulkId.includes(item.id));
  //     });
  //   }
  // };
  const tableInstance = useTable(
    { columns, data },

    useGlobalFilter,
    useGroupBy,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect
    // (hooks) => {
    //   hooks.visibleColumns.push((columns) => {
    //     return [
    //       {
    //         id: "selection",
    //         Header: ({ getToggleAllRowsSelectedProps }) => (
    //           <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
    //         ),
    //         Cell: ({ row }) => (
    //           <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
    //         ),
    //       },
    //       ...columns,
    //     ];
    //   });
    // }
  );
  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } =
    tableInstance;

  const headers = [
    { label: "Uuid", key: "uuid" },
    { label: "Tên người dùng", key: "name" },
    { label: "Số điện thoại", key: "phoneNumber" },
    { label: "Địa chỉ mặc định", key: "address" },
    { label: "Tổng tiền đã chi", key: "totalMoneySpent" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(2);

  const [filter, setFilter] = useState("");
  const [itemPerPage, setItemPerPage] = useState(10);
  function nextPageHandler() {
    if (currentPage < lastPage) {
      setCurrentPage((previousPage) => previousPage + 1);
    }
  }

  function previousPageHandler() {
    if (currentPage > 1) {
      setCurrentPage((previousPage) => previousPage - 1);
    }
  }

  function firstPageHandler() {
    setCurrentPage(1);
  }

  function lastPageHandler() {
    setCurrentPage(lastPage);
  }

  function changePageOnClickedValue(e) {
    setCurrentPage(+e.target.value);
  }
  ////////////////////////////////
  // DATABASE FETCH HANDLERS
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [noFoundSearchResult, setNoFoundSearchResult] = useState(false);
  const fetchUsers = useCallback(async () => {
    setNoFoundSearchResult(false);
    setIsLoading(true);
    setData([]);
    try {
      const userToken = JSON.parse(localStorage.getItem("personalAccessToken"));

      await apiClient.get("/sanctum/csrf-cookie");

      const response = await apiClient.get(
        `api/admin/user?page=${currentPage}&itemPerPage=${itemPerPage}&filter=${filter}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      setLastPage(response.data.last_page);

      if (response.data.data.length > 0) {
        const transformedUsers = response.data.data.map((user) => {
          return new UserInTable(
            user.uuid,
            user.name,
            user.phone_number,
            user.address,
            user.total_money_spent === null
              ? "Chưa mua hàng lần nào"
              : user.total_money_spent
          );
        });
        setData(transformedUsers);
      } else {
        setNoFoundSearchResult(true);
      }
    } catch (error) {
      // alert(error.response.data.message);
      setHasError(true);
    }
    setIsLoading(false);
  }, [currentPage, filter, itemPerPage]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="card">
      <div className="card-header bg-primary">
        <h3 className="card-title">Danh sách người dùng</h3>
      </div>

      <div className="card-body">
        <div className="row px-2 mb-2 mt-2">
          <div className="col-md-6">
            <Button
              as={CSVLink}
              data={data}
              headers={headers}
              variant="secondary"
            >
              Xuất file Excel
            </Button>
            {/*<Button variant="danger" onClick={deleteBulkInfoHandler}>*/}
            {/*  Xóa các danh mục đã chọn*/}
            {/*</Button>*/}
          </div>
          <div className="col-md-6 text-right">
            <GlobalFilter filter={filter} setFilter={setFilter} />
            <select
              value={itemPerPage}
              onChange={(e) => {
                setItemPerPage(+e.target.value);
                setCurrentPage(1);
              }}
            >
              {[5, 10, 25, 50].map((pageSize) => {
                return (
                  <option key={pageSize} value={pageSize}>
                    Hiện {pageSize} dòng
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <table
          id="customers-table"
          className="table table-bordered table-hover table-responsive"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    {...column.getHeaderProps()}
                  >
                    {column.render("Header")}{" "}
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <FontAwesomeIcon icon={solid("arrow-down")} />
                        ) : (
                          <FontAwesomeIcon icon={solid("arrow-up")} />
                        )
                      ) : (
                        ""
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {isLoading && (
              <tr>
                <td style={{ textAlign: "center" }} colSpan={6}>
                  Đang tải thông tin...
                </td>
              </tr>
            )}
            {hasError && (
              <tr>
                <td style={{ textAlign: "center" }} colSpan={6}>
                  Đã có lỗi xảy ra
                </td>
              </tr>
            )}
            {noFoundSearchResult && (
              <tr>
                <td style={{ textAlign: "center" }} colSpan={6}>
                  Không tìm thấy người dùng nào theo đúng nhu cầu của bạn.
                </td>
              </tr>
            )}

            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell, i) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div style={{ textAlign: "right" }}>
          {/*<span>*/}
          {/*  Trang <strong>{pageIndex + 1}</strong> / {pageCount}*/}
          {/*</span>*/}
          {/*<button*/}
          {/*  className="btn btn-dark"*/}
          {/*  onClick={() => previousPage()}*/}
          {/*  disabled={!canPreviousPage}*/}
          {/*>*/}
          {/*  <FontAwesomeIcon icon={solid("angle-left")} />*/}
          {/*</button>*/}

          {/*<button*/}
          {/*  className="btn btn-dark"*/}
          {/*  onClick={() => nextPage()}*/}
          {/*  disabled={!canNextPage}*/}
          {/*>*/}
          {/*  <FontAwesomeIcon icon={solid("angle-right")} />*/}
          {/*</button>*/}
          <ul className="pagination">
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
        </div>
      </div>
      <ModalUserDetails
        userUuid={userUuid}
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
      />
    </div>
  );
};
export default CardUsersTable;
