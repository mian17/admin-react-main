const CardOrdersTable = () => {
  // useScript()
  return (
    <div className="card">
      <div className="card-header bg-primary">
        <h3 className="card-title">Danh sách đơn hàng</h3>
      </div>

      <div className="card-body">
        <table id="example1" className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Mã đơn hàng</th>
              <th>Kho xuất</th>
              <th>Ngày bán</th>
              <th>Thu ngân</th>
              <th>Khách hàng</th>
              <th>Trạng thái</th>
              <th>Tổng tiền</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Trident</td>
              <td>Internet Explorer 4.0</td>
              <td>Win 95+</td>
              <td> 4</td>
              <td>X</td>
              <td>example</td>
              <td>example</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th>Mã đơn hàng</th>
              <th>Kho xuất</th>
              <th>Ngày bán</th>
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
