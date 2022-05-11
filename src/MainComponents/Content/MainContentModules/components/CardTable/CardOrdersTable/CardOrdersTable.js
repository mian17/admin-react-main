import { useRef, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import { CSVLink } from "react-csv";

const CardOrdersTableMessage = (props) => {
  return (
    <tr>
      <td style={{ textAlign: "center" }} colSpan={props.numCols}>
        {props.message}
      </td>
    </tr>
  );
};

const CardOrdersTable = (props) => {
  const data = props.tableItems;
  const ordersId = data.map((order) => order.orderAddId);
  // States
  const [idQuery, setIdQuery] = useState("");

  const [selectAllOrder, setSelectAllOrder] = useState(false);
  const [ordersIdForDeletion, setOrdersIdForDeletion] = useState([]);

  const selectAllCheckbox = useRef(null);

  // Data for Table
  const headers = [
    { label: "Mã đơn hàng", key: "orderAddId" },
    { label: "Kho xuất", key: "orderAddWarehouse" },
    { label: "Thời điểm bán", key: "orderAddDateTime" },
    { label: "Thu ngân", key: "orderAddSeller" },
    { label: "Khách hàng", key: "orderAddCustomerName" },
    { label: "Trạng thái", key: "orderAddStatus" },
    { label: "Tổng tiền", key: "orderAddTotalMoney" },
  ];

  const CSVBtnClasses =
    Object.keys(data).length === 0
      ? "btn btn-secondary disabled"
      : "btn btn-secondary";

  const filteredArray = props.tableItems.filter((item) => {
    if (idQuery === "" || idQuery.length === 1) {
      return item;
    } else {
      return item.orderAddId.includes(idQuery);
    }
  });

  // Handlers
  const idQueryChangeHandler = (e) => {
    setIdQuery(e.target.value);
  };

  const selectAllOrderHandler = () => {
    setSelectAllOrder((prevState) => !prevState);

    setOrdersIdForDeletion([...ordersId]);
    if (selectAllOrder) {
      setOrdersIdForDeletion([]);
    }
  };
  // FIXME indeterminate process does not produce desired result

  // TODO: IMPLEMENT CHANGING PROPS OF SELECT ALL ORDER FOR DELETION BUTTON
  //  TO INDETERMINATE, IN ORDER TO ACHIEVE THE DESIRED RESULT
  const addIdForDeletionChangeHandler = (e) => {
    const { id, checked } = e.target;
    setOrdersIdForDeletion((prevState) => [...prevState, id]);

    // if (checked) {
    //   if (
    //     ordersIdForDeletion.length < data.length &&
    //     ordersIdForDeletion.length > 0
    //   )
    //     selectAllCheckbox.current.indeterminate = true;
    //   // else if (ordersIdForDeletion.length === 0)
    //   //   selectAllCheckbox.current.indeterminate = false;
    // }

    if (!checked) {
      setOrdersIdForDeletion((prevState) =>
        prevState.filter((value) => value !== id)
      );
    }
  };

  const deleteSelectedOrderHandler = () => {
    props.onClickDeleteSelectedOrders(ordersIdForDeletion);
  };

  // For disabling input check box all order for deletion
  let noDataToDeleteAll = data.length === 0;

  return (
    <div className="card">
      <div className="card-header bg-secondary">
        <h3 className="card-title">Danh sách đơn hàng</h3>
      </div>
      <div className="p-2 d-flex">
        <div className="form-inline">
          <div className="input-group">
            <input
              className="form-control"
              type="search"
              placeholder="Nhập mã đơn hàng để tìm kiếm"
              aria-label="Tìm kiếm"
              onChange={idQueryChangeHandler}
            />
          </div>

          <CSVLink className={CSVBtnClasses} data={data} headers={headers}>
            Xuất file Excel
          </CSVLink>
          <button
            className="btn btn-danger"
            disabled={noDataToDeleteAll}
            onClick={deleteSelectedOrderHandler}
          >
            Xóa đơn hàng đã chọn
          </button>
        </div>
      </div>
      <div className="card-body table-responsive overflow-auto p-3">
        <table
          id="orders-table"
          className="table table-bordered table-hover text-nowrap "
        >
          <thead>
            <tr>
              <th>
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="checkAllOrders"
                    onChange={selectAllOrderHandler}
                    checked={
                      ordersIdForDeletion.length === data.length && // control checkbox state when same length as incoming data
                      ordersIdForDeletion.length > 0 // and when the array for deletion has any other value
                    }
                    disabled={noDataToDeleteAll}
                    ref={selectAllCheckbox}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="checkAllOrders"
                    style={{ left: "4px" }}
                  ></label>
                </div>
              </th>
              <th>Mã đơn hàng</th>
              <th>Kho xuất</th>
              <th>Thời điểm bán</th>
              <th>Thu ngân</th>
              <th>Khách hàng</th>
              <th>Trạng thái</th>
              <th>Tổng tiền</th>
              <th>Tính năng</th>
            </tr>
          </thead>
          <tbody>
            {filteredArray.length === 0 && props.tableItems.length === 0 && (
              <CardOrdersTableMessage
                numCols={9}
                message={"Không có dữ liệu"}
              />
            )}

            {filteredArray.length === 0 && props.tableItems.length !== 0 && (
              <CardOrdersTableMessage
                numCols={9}
                message={"Không có dữ liệu phù hợp với mã đơn hàng bạn nhập."}
              />
            )}

            {filteredArray &&
              filteredArray.map((order, i) => {
                const {
                  orderAddId: orderId,
                  orderAddWarehouse: orderWarehouse,
                  orderAddDateTime: orderDateTime,
                  orderAddSeller: orderSeller,
                  orderAddCustomerName: orderCustomerName,
                  orderAddTotalMoney: orderTotalMoney,
                  orderAddStatus: orderStatus,
                } = order;

                const dateOption = {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                };
                let orderDate = orderDateTime.toLocaleDateString(
                  "vi",
                  dateOption
                );

                const timeOption = {
                  hour: "2-digit",
                  minute: "2-digit",
                };
                let orderTime = orderDateTime.toLocaleTimeString(
                  "vi",
                  timeOption
                );

                return (
                  <tr key={i} data-id={i}>
                    <td>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={orderId}
                          style={{ top: "2px", left: "26px" }}
                          value={orderId}
                          checked={ordersIdForDeletion.includes(orderId)}
                          onChange={addIdForDeletionChangeHandler}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={"orderCheck" + i}
                        ></label>
                      </div>
                    </td>
                    <td>{orderId}</td>
                    <td>{orderWarehouse}</td>
                    <td>{orderDate + " " + orderTime}</td>
                    <td>{orderSeller}</td>
                    <td>{orderCustomerName}</td>
                    <td>{orderStatus}</td>
                    <td>{orderTotalMoney + " VNĐ"}</td>
                    <td>
                      <div>
                        <button
                          className="btn btn-secondary btn-sm justify-content-center mr-2"
                          onClick={props.onClickCopyIcon}
                        >
                          <FontAwesomeIcon
                            style={{ cursor: "pointer" }}
                            icon={faCopy}
                          />
                        </button>
                        <button
                          className="btn btn-success btn-sm justify-content-center mr-2"
                          data-toggle="modal"
                          data-target={".modal-for-order-id-" + i}
                          onClick={props.onClickEditIcon}
                        >
                          <FontAwesomeIcon
                            style={{ cursor: "pointer" }}
                            icon={faPenToSquare}
                          />
                        </button>
                        <button
                          className="btn btn-danger btn-sm justify-content-center"
                          onClick={props.onClickDeleteIcon}
                        >
                          <FontAwesomeIcon
                            style={{ cursor: "pointer" }}
                            icon={faTrash}
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
          <tfoot>
            <tr>
              <th>&nbsp;</th>
              <th>Mã đơn hàng</th>
              <th>Kho xuất</th>
              <th>Thời điểm bán</th>
              <th>Thu ngân</th>
              <th>Khách hàng</th>
              <th>Trạng thái</th>
              <th>Tổng tiền</th>
              <th>Tính năng</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};
export default CardOrdersTable;
