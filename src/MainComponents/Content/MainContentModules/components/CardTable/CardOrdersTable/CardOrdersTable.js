import {useCallback, useEffect, useMemo, useState} from "react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useGlobalFilter, useTable} from "react-table";
import classes from "../CardCategoryTable/CardCategoryTable.module.css";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {Table} from "react-bootstrap";
import apiClient from "../../../../../../api";
import {tokenHeaderConfig} from "../../../../../../common/utils/api-config";
import OrderInTable from "./cardOrdersTable-utils/OrderInTable";
import GlobalFilter from "../../../../../../common/components/GlobalFilter";
import ModalEditOrderDetails from "./ModalEditOrderDetails";
import {useNavigate} from "react-router-dom";
import {formatMoney} from "../../../../../../common/utils/helperFunctions";

// const CardOrdersTableMessage = (props) => {
//   return (
//     <tr>
//       <td style={{ textAlign: "center" }} colSpan={props.numCols}>
//         {props.message}
//       </td>
//     </tr>
//   );
// };

const CardOrdersTable = () => {
  const navigate = useNavigate();
  const [statuses, setStatuses] = useState([]);

  const [data, setData] = useState(useMemo(() => [], []));

  function deleteOrder(orderUuid) {
    const result = window.confirm(
      "Bạn có chắc chắn muốn xóa đơn hàng này? Dữ liệu này sẽ bị xóa VĨNH VIỄN!"
    );

    if (result) {
      apiClient.get("/sanctum/csrf-cookie").then(() => {
        apiClient
          .delete(`api/admin/order/${orderUuid}`, tokenHeaderConfig)
          .then((response) => {
            alert(response.data.message);
            navigate(0);
          })
          .catch((error) => {
            alert(error.response.data.message);
          });
      });
    }
  }

  const columns = useMemo(
    () => [
      {
        Header: "Mã đơn hàng",
        accessor: "orderUuid",
      },
      {
        Header: "Họ tên người nhận",
        accessor: "receiverName",
      },
      {
        Header: "Số điện thoại người nhận",
        accessor: "receiverPhoneNumber",
      },
      {
        Header: "Địa chỉ người nhận",
        accessor: "receiverAddress",
      },
      {
        Header: "Trạng thái",
        accessor: "orderStatus",

        Cell: ({ cell }) => {
          const rowValues = cell.row.values;
          const rowItemUuid = cell.row.values.orderUuid;

          return (
            <select
              onChange={(e) => {
                apiClient.get("/sanctum/csrf-cookie").then(() => {
                  apiClient
                    .patch(
                      `api/admin/order-status-update/${rowItemUuid}`,
                      { status_id: e.target.value },
                      tokenHeaderConfig
                    )
                    .then((response) => {
                      alert(response.data.message);
                    })
                    .catch((error) => {
                      alert(error.response.data.message);
                    });
                });
              }}
              defaultValue={rowValues.orderStatus}
            >
              {statuses.length > 0 &&
                statuses.map((status, index) => {
                  return (
                    <option value={status.id} key={index}>
                      {status.name}
                    </option>
                  );
                })}
            </select>
          );
        },
      },
      {
        Header: "Trạng thái thanh toán",
        accessor: "paymentStatus",

        Cell: ({ cell }) => {
          const rowValues = cell.row.values;
          const rowItemUuid = cell.row.values.orderUuid; // id from ProductInCart.js constructor
          // const rowItemId = row.index; // id from ProductInCart.js constructor
          return (
            <select
              onChange={(e) => {
                apiClient.get("/sanctum/csrf-cookie").then(() => {
                  apiClient
                    .patch(
                      `api/admin/payment-details/${rowItemUuid}`,
                      { status: e.target.value },
                      tokenHeaderConfig
                    )
                    .then((response) => {
                      console.log(response);
                      alert(response.data.message);
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                });
              }}
              defaultValue={rowValues.paymentStatus}
            >
              <option value="Chưa thanh toán">Chưa thanh toán</option>
              <option value="Đã thanh toán">Đã thanh toán</option>
            </select>
          );
        },
      },
      {
        Header: "Tổng tiền",
        accessor: "totalMoney",

        Cell: ({ cell, row }) => {
          const totalMoneySpent = cell.row.values.totalMoney;

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

        Cell: ({ cell }) => {
          const rowValues = cell.row.values;
          const rowItemUuid = cell.row.values.orderUuid; // id from ProductInCart.js constructor
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
                onClick={() => handleShow(rowItemUuid)}
              >
                <FontAwesomeIcon icon={solid("pen-to-square")} />
              </button>
              <button
                className="btn btn-danger"
                onClick={() => deleteOrder(rowItemUuid)}
              >
                <FontAwesomeIcon icon={solid("trash-can")} />
              </button>
            </div>
          );
        },
      },
    ],
    [statuses]
  );
  const tableInstance = useTable({ data, columns }, useGlobalFilter);
  const { getTableProps, headerGroups, getTableBodyProps, rows, prepareRow } =
    tableInstance;

  ///////////////////////////////////////
  // Fetch Data

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(2);

  const [filter, setFilter] = useState("");

  const fetchOrders = useCallback(async () => {
    try {
      await apiClient.get("/sanctum/csrf-cookie");
      const response = await apiClient.get(
        `api/admin/order?page=${currentPage}&filter=${
          filter.length > 3 ? filter : ""
        }`,
        tokenHeaderConfig
      );
      // console.log(response.data.data);
      setLastPage(response.data.last_page);
      const transformedOrders = response.data.data.map((order) => {
        return new OrderInTable(
          order.uuid,
          order.receiver_name,
          order.receiver_phone_number,
          order.receiver_address,
          order.status_id,
          order.payment_details.status,
          order.total
        );
      });
      setData(transformedOrders);
    } catch (error) {
      console.log(error);
    }
  }, [currentPage, filter]);

  const fetchOrderStatuses = useCallback(async () => {
    try {
      await apiClient.get("/sanctum/csrf-cookie");
      const response = await apiClient.get(
        `api/admin/order-status`,
        tokenHeaderConfig
      );
      setStatuses(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    fetchOrders();
    fetchOrderStatuses();
  }, [fetchOrderStatuses, fetchOrders]);

  ///////////////////////////////////////
  // Pagination Handler

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

  function copyInfoHandler(valueObj) {
    let readyForClipboard = "";
    for (const property in valueObj) {
      if (property === "functions" || property === "img") continue;
      readyForClipboard += `${valueObj[property]}\t`;
    }
    navigator.clipboard.writeText(readyForClipboard).then(() => {
      alert("Đã copy nội dung hàng của bảng!");
    });
  }

  const [show, setShow] = useState(false);
  const [editingOrderUuid, setEditingOrderUuid] = useState(null);

  const handleShow = (orderUuid) => {
    setEditingOrderUuid(orderUuid);
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
    console.log("clicked");
  };

  return (
    <div className="card">
      <div className="card-header bg-secondary">
        <h3 className="card-title">Danh sách đơn hàng</h3>
      </div>
      <div className="p-2 d-flex flex-row-reverse mt-2">
        <GlobalFilter
          filter={filter}
          setFilter={setFilter}
          style={{ justifySelf: "flex-end" }}
        />
      </div>
      <div className="card-body">
        <Table
          {...getTableProps()}
          striped
          bordered
          hover
          responsive
          className={classes["table"]}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    className={classes["sticky-table-header"]}
                    {...column.getHeaderProps()}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        className={classes["table-text-center"]}
                        {...cell.getCellProps()}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
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

        <ModalEditOrderDetails
          show={show}
          handleClose={handleClose}
          handleShow={handleShow}
          orderUuid={editingOrderUuid}
        />
      </div>
    </div>
  );
};
export default CardOrdersTable;
