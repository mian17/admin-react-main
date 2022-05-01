import { useState, useEffect } from "react";
import OrderContext from "../../store/order-context";

const CardOrdersTable = (props) => {
  // const orderCtx = useContext(OrderContext);
  // const orders = orderCtx.orders.slice();
  // console.log(orders);

  // const [data, setData] = useState(props.tableItems);

  console.log("Re RENDERED");
  // useScript()

  return (
    <div className="card">
      <div className="card-header bg-primary">
        <h3 className="card-title">Danh sách đơn hàng</h3>
      </div>

      <div className="card-body">
        <table id="orders-table" className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Mã đơn hàng</th>
              <th>Kho xuất</th>
              <th>Thời điểm bán</th>
              <th>Thu ngân</th>
              <th>Khách hàng</th>
              <th>Trạng thái</th>
              <th>Tổng tiền</th>
            </tr>
          </thead>
          <tbody>
            {/*<tr>*/}
            {/*  <td>000000001</td>*/}
            {/*  <td>TP. Hồ Chí Minh</td>*/}
            {/*  <td>24/5/2021 9:30</td>*/}
            {/*  <td>Ngô Thị Đỗ</td>*/}
            {/*  <td>Trần Văn Ninh</td>*/}
            {/*  <td>Xác nhận đơn</td>*/}
            {/*  <td>3.000.000 VNĐ</td>*/}
            {/*</tr>*/}

            {props.tableItems.length === 0 && (
              <tr>
                <td style={{ textAlign: "center" }} colSpan={7}>
                  Không có dữ liệu
                </td>
              </tr>
            )}

            {props.tableItems &&
              props.tableItems.map((order, i) => {
                return (
                  <tr key={i}>
                    <td>{order.idValue}</td>
                    <td>{order.warehouseValue}</td>
                    <td>{order.dateTimeValue}</td>
                    <td>{order.sellerValue}</td>
                    <td>{order.customerValue}</td>
                    <td>Xác nhận đơn</td>
                    <td>{order.totalMoneyValue}</td>
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
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};
export default CardOrdersTable;
