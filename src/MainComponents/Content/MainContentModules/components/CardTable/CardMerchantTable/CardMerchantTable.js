import { useCallback, useEffect, useMemo, useState } from "react";
import apiClient from "../../../../../../api";
import { copyInfoHandler } from "../../../../../../common/utils/tableFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { confirm } from "react-confirm-box";
import { confirmBoxOptions } from "../../../../../../common/utils/options";
import {
  useExpanded,
  useGlobalFilter,
  useGroupBy,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import Button from "react-bootstrap/Button";
import { CSVLink } from "react-csv";
import GlobalFilter from "../../../../../../common/components/GlobalFilter";
import MerchantInTable from "./cardMerchantTable-utils/MerchantInTable";
import ModalEditMerchant from "../../Forms/Merchant/ModalEditMerchant";
import { useNavigate } from "react-router-dom";

const CardMerchantTable = () => {
  const navigate = useNavigate();

  ////////////////////////////////
  // DATABASE FETCH
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [noFoundSearchResult, setNoFoundSearchResult] = useState(false);

  const [data, setData] = useState(useMemo(() => [], []));

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(2);

  const [filter, setFilter] = useState("");
  const [itemPerPage, setItemPerPage] = useState(10);

  const fetchMerchants = useCallback(async () => {
    setNoFoundSearchResult(false);
    setIsLoading(true);
    setData([]);
    try {
      const userToken = JSON.parse(localStorage.getItem("personalAccessToken"));
      await apiClient.get("/sanctum/csrf-cookie");

      const response = await apiClient.get(
        `api/admin/merchant?page=${currentPage}&itemPerPage=${itemPerPage}&filter=${filter}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      setLastPage(response.data.last_page);
      console.log(response);

      if (response.data.data.length > 0) {
        const transformedMerchants = response.data.data.map((merchant) => {
          return new MerchantInTable(
            merchant.id,
            merchant.name,
            merchant.phone_number,
            merchant.address,
            merchant.email
          );
        });
        setData(transformedMerchants);
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
    fetchMerchants();
  }, [fetchMerchants]);

  const headers = [
    { label: "Id", key: "id" },
    { label: "Tên nhà bán", key: "name" },
    { label: "Số điện thoại", key: "phoneNumber" },
    { label: "Địa chỉ", key: "address" },
    { label: "Email", key: "email" },
    // { label: "Nhà bán", key: "category" },
  ];
  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id", // accessor is the "key" in the data
      },
      {
        Header: "Tên nhà bán",
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
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Chức năng",
        accessor: "functions",

        Cell: ({ cell, row }) => {
          const rowValues = cell.row.values;
          const rowItemId = cell.row.values.id;

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
                onClick={() => editInfoHandler(rowItemId)}
              >
                <FontAwesomeIcon icon={solid("pen-to-square")} />
              </button>
              <button
                className="btn btn-danger"
                // onClick={() => moveToTrash(rowItemUuid)}
                onClick={() => moveToTrash(rowItemId, navigate)}
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

  function editInfoHandler(merchantId) {
    setEditingMerchantId(merchantId);
    setShow(true);
  }
  async function moveToTrash(itemId, navigate) {
    const result = await confirm(
      "Bạn có chắc chắn muốn xóa nhà bán này?",
      confirmBoxOptions
    );
    if (result) {
      setData((prevState) => prevState.filter((item) => item.id !== itemId));
      apiClient.get("/sanctum/csrf-cookie").then(() => {
        const userToken = JSON.parse(
          localStorage.getItem("personalAccessToken")
        );
        apiClient
          .get(`api/admin/merchant-to-trash/${itemId}`, {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          })
          .then((response) => {
            console.log(response);
            navigate(0);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    }
  }

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

  const tableInstance = useTable(
    { columns, data },

    useGlobalFilter,
    useGroupBy,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect
  );
  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } =
    tableInstance;

  // Editing warehouse id state
  const [editingMerchantId, setEditingMerchantId] = useState(null);

  // Modal State
  const [show, setShow] = useState(false);
  // Modal Handlers
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <div className="col-12">
      <div className="card">
        <div className="card-header bg-primary">
          <h3 className="card-title">Danh sách các nhà bán</h3>
        </div>
        <div className="card-body">
          <div className="row px-2 mb-2 mt-2">
            <div className="col-md-6">
              {/*<Button*/}
              {/*  as={CSVLink}*/}
              {/*  data={data}*/}
              {/*  headers={headers}*/}
              {/*  variant="secondary"*/}
              {/*>*/}
              {/*  Xuất file Excel*/}
              {/*</Button>*/}
              <Button
                as={CSVLink}
                data={data}
                headers={headers}
                variant="secondary"
              >
                Xuất file Excel
              </Button>
              {/*/!*<Button variant="danger" onClick={deleteBulkInfoHandler}>*!/*/}
              {/*/!*  Xóa các danh mục đã chọn*!/*/}
              {/*/!*</Button>*!/*/}
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
            id="stock-table"
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
                  <td style={{ textAlign: "center" }} colSpan="100%">
                    Đang tải thông tin...
                  </td>
                </tr>
              )}
              {hasError && (
                <tr>
                  <td style={{ textAlign: "center" }} colSpan="100%">
                    Đã có lỗi xảy ra
                  </td>
                </tr>
              )}
              {noFoundSearchResult && (
                <tr>
                  <td style={{ textAlign: "center" }} colSpan="100%">
                    Không tìm nhà kho nào theo đúng nhu cầu của bạn.
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
      </div>
      <ModalEditMerchant
        editingMerchantId={editingMerchantId}
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
      />
    </div>
  );
};
export default CardMerchantTable;
