import {useCallback, useEffect, useMemo, useState} from "react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useGlobalFilter, useTable} from "react-table";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import apiClient from "../../../../../../api";
import OrderInTable from "./cardOrdersTable-utils/OrderInTable";
import GlobalFilter from "../../../../../../common/components/GlobalFilter";
import ModalEditOrderDetails from "./ModalEditOrderDetails";
import {useNavigate} from "react-router-dom";
import {formatMoney} from "../../../../../../common/utils/helperFunctions";
import AdminPagination from "../../../../../../common/components/AdminPagination";
import useAdminPagination from "../../../../../../hooks/use-admin-pagination";
import ReactTable from "../../../../../../common/components/ReactTable";
import useFetchingTableData from "../../../../../../hooks/use-fetching-table-data";
import LinearProgress from "../../../../../../common/components/LinearProgress";

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
  const [progressBarIsShown, setProgressBarIsShown] = useState(false);
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
                setProgressBarIsShown(true);
                apiClient.get("/sanctum/csrf-cookie").then(() => {
                  const userToken = JSON.parse(
                    localStorage.getItem("personalAccessToken")
                  );

                  apiClient
                    .patch(
                      `api/admin/order-status-update/${rowItemUuid}`,
                      { status_id: e.target.value },
                      {
                        headers: {
                          Accept: "application/json",
                          Authorization: `Bearer ${userToken}`,
                        },
                      }
                    )
                    .then((response) => {
                      setTimeout(() => {
                        setProgressBarIsShown(false);
                      }, 300);
                      alert(response.data.message);
                    })
                    .catch((error) => {
                      setTimeout(() => {
                        setProgressBarIsShown(false);
                      }, 300);
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
                console.log("ran");
                setProgressBarIsShown(true);

                apiClient.get("/sanctum/csrf-cookie").then(() => {
                  const userToken = JSON.parse(
                    localStorage.getItem("personalAccessToken")
                  );

                  apiClient
                    .patch(
                      `api/admin/payment-details/${rowItemUuid}`,
                      { status: e.target.value },
                      {
                        headers: {
                          Accept: "application/json",
                          Authorization: `Bearer ${userToken}`,
                        },
                      }
                    )
                    .then((response) => {
                      setTimeout(() => {
                        setProgressBarIsShown(false);
                      }, 300);
                      console.log(response);
                      alert(response.data.message);
                    })
                    .catch((error) => {
                      setTimeout(() => {
                        setProgressBarIsShown(false);
                      }, 300);
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
            <div className="d-flex justify-content-between">
              {/*<button*/}
              {/*  className="btn btn-success"*/}
              {/*  onClick={() => copyInfoHandler(rowValues)}*/}
              {/*>*/}
              {/*  <FontAwesomeIcon icon={solid("copy")} />*/}
              {/*</button>*/}
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

  function deleteOrder(orderUuid) {
    const result = window.confirm(
      "Bạn có chắc chắn muốn xóa đơn hàng này? Dữ liệu này sẽ bị xóa VĨNH VIỄN!"
    );

    if (result) {
      apiClient.get("/sanctum/csrf-cookie").then(() => {
        const userToken = JSON.parse(
          localStorage.getItem("personalAccessToken")
        );

        apiClient
          .delete(`api/admin/order/${orderUuid}`, {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          })
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

  const tableInstance = useTable({ data, columns }, useGlobalFilter);
  const { getTableProps, headerGroups, getTableBodyProps, rows, prepareRow } =
    tableInstance;

  ///////////////////////////////////////
  // Fetch Data

  // const [currentPage, setCurrentPage] = useState(1);
  // const [lastPage, setLastPage] = useState(2);

  const {
    currentPage,
    lastPage,
    setLastPage,
    nextPageHandler,
    previousPageHandler,
    firstPageHandler,
    lastPageHandler,
    changePageOnClickedValue,
  } = useAdminPagination();

  const [filter, setFilter] = useState("");

  // const fetchOrders = useCallback(async () => {
  //   try {
  //     const userToken = JSON.parse(localStorage.getItem("personalAccessToken"));
  //
  //     await apiClient.get("/sanctum/csrf-cookie");
  //     const response = await apiClient.get(
  //       `api/admin/order?page=${currentPage}&filter=${
  //         filter.length > 3 ? filter : ""
  //       }`,
  //       {
  //         headers: {
  //           Accept: "application/json",
  //           Authorization: `Bearer ${userToken}`,
  //         },
  //       }
  //     );
  //     // console.log(response.data.data);
  //     setLastPage(response.data.last_page);
  //     const transformedOrders = response.data.data.map((order) => {
  //       return new OrderInTable(
  //         order.uuid,
  //         order.receiver_name,
  //         order.receiver_phone_number,
  //         order.receiver_address,
  //         order.status_id,
  //         order.payment_details.status,
  //         order.total
  //       );
  //     });
  //     setData(transformedOrders);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [currentPage, filter, setLastPage]);

  const transformOrderResponse = (response) => {
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
    return transformedOrders;
  };
  console.log(progressBarIsShown);
  const {
    isLoading,
    hasError,
    noFoundSearchResult,
    fetchData: fetchOrders,
  } = useFetchingTableData(
    `api/admin/order?page=${currentPage}&filter=${
      filter.length > 3 ? filter : ""
    }`,
    setData,
    transformOrderResponse
  );

  const fetchOrderStatuses = useCallback(async () => {
    try {
      const userToken = JSON.parse(localStorage.getItem("personalAccessToken"));

      await apiClient.get("/sanctum/csrf-cookie");
      const response = await apiClient.get(`api/admin/order-status`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });
      setStatuses(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    fetchOrders();
    fetchOrderStatuses();
  }, [fetchOrderStatuses, fetchOrders]);

  // function copyInfoHandler(valueObj) {
  //   let readyForClipboard = "";
  //   for (const property in valueObj) {
  //     if (property === "functions" || property === "img") continue;
  //     readyForClipboard += `${valueObj[property]}\t`;
  //   }
  //   navigator.clipboard.writeText(readyForClipboard).then(() => {
  //     alert("Đã copy nội dung hàng của bảng!");
  //   });
  // }

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
      {progressBarIsShown && <LinearProgress />}
      <div className="card-body">
        <ReactTable
          getTableProps={getTableProps}
          headerGroups={headerGroups}
          getTableBodyProps={getTableBodyProps}
          rows={rows}
          prepareRow={prepareRow}
          isLoading={isLoading}
          hasError={hasError}
          noFoundSearchResult={noFoundSearchResult}
        />
        <AdminPagination
          firstPageHandler={firstPageHandler}
          previousPageHandler={previousPageHandler}
          currentPage={currentPage}
          lastPage={lastPage}
          changePageOnClickedValue={changePageOnClickedValue}
          nextPageHandler={nextPageHandler}
          lastPageHandler={lastPageHandler}
        />

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
