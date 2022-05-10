import { useState } from "react";

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
        {/*Không có dữ liệu phù hợp với mã đơn hàng bạn nhập.*/}
        {props.message}
      </td>
    </tr>
  );
};

const CardOrdersTable = (props) => {
  // States
  const [idQuery, setIdQuery] = useState("");

  const idQueryChangeHandler = (e) => {
    setIdQuery(e.target.value);
  };

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
  const data = props.tableItems;

  const CSVBtnClasses =
    Object.keys(data).length === 0
      ? "btn btn-success disabled"
      : "btn btn-success";

  const filteredArray = props.tableItems.filter((item) => {
    if (idQuery === "" || idQuery.length === 1) {
      return item;
    } else {
      return item.orderAddId.includes(idQuery);
    }
  });

  return (
    <div className="card">
      <div className="card-header bg-primary">
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
        </div>
      </div>
      <div className="card-body table-responsive p-0">
        <table
          id="orders-table"
          className="table table-bordered table-hover table-head-fixed text-nowrap"
        >
          <thead>
            <tr>
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
                numCols={8}
                message={"Không có dữ liệu"}
              />
            )}

            {filteredArray.length === 0 && props.tableItems.length !== 0 && (
              <CardOrdersTableMessage
                numCols={8}
                message={"Không có dữ liệu phù hợp với mã đơn hàng bạn nhập."}
              />
            )}

            {filteredArray &&
              filteredArray.map((order, i, arr) => {
                if (arr.length === 0)
                  console.log("There's nothing in the array");
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
