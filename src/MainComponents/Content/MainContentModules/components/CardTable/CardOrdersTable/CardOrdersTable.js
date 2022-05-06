const CardOrdersTable = (props) => {
  console.log("Re RENDERED");

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
                  <tr key={i}>
                    <td>{orderId}</td>
                    <td>{orderWarehouse}</td>
                    <td>{orderDate + " " + orderTime}</td>
                    <td>{orderSeller}</td>
                    <td>{orderCustomerName}</td>
                    <td>{orderStatus}</td>
                    <td>{orderTotalMoney + " VNĐ"}</td>
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
