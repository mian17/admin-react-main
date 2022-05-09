const CardStockTable = () => {
  // Mã phiếu nhập, kho nhập, tình trạng, ngày nhập, người nhập, tổng tiền ,nợ
  return (
    <div className="col-12">
      <div className="card">
        <div className="card-header bg-primary">
          <h3 className="card-title">Danh sách sản phẩm trong kho</h3>
        </div>

        <div className="card-body table-responsive p-0">
          <table
            id="stock-table"
            className="table table-bordered table-hover table-sm table-head-fixed text-nowrap"
          >
            <thead>
              <tr>
                <th>Mã phiếu nhập</th>
                <th>Kho nhập</th>
                <th>Tình trạng</th>
                <th>Ngày nhập</th>
                <th>Người nhập</th>
                <th>Tổng tiền</th>
                <th>Nợ</th>
                <th>Tính năng</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>000001</td>
                <td>TP. Hồ Chí Minh</td>
                <td>Rớt xuống biển</td>
                <td>11-11-1111</td>
                <td>Nguyễn Thị Văn Trần Đình Thái Lệ</td>
                <td>1.000.000.000 VNĐ</td>
                <td>0 VNĐ</td>
                <td>Xóa</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th>Mã phiếu nhập</th>
                <th>Kho nhập</th>
                <th>Tình trạng</th>
                <th>Ngày nhập</th>
                <th>Người nhập</th>
                <th>Tổng tiền</th>
                <th>Nợ</th>
                <th>Tính năng</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};
export default CardStockTable;
