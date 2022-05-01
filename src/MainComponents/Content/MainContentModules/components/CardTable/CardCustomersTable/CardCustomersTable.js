const CardCustomersTable = () => {
  // Mã khách hàng, tên kh, điện thoại, địa chỉ, lần cuối mua hàng, tổng tiền hàng, tổng nợ, tính năng
  return (
    <div className="card">
      <div className="card-header bg-primary">
        <h3 className="card-title">Danh sách khách hàng</h3>
      </div>

      <div className="card-body">
        <table
          id="customers-table"
          className="table table-bordered table-hover"
        >
          <thead>
            <tr>
              <th>Mã khách hàng</th>
              <th>Tên khách hàng</th>
              <th>Điện thoại</th>
              <th>Địa chỉ</th>
              <th>Lần cuối mua hàng</th>
              <th>Tổng tiền hàng</th>
              <th>Tổng nợ</th>
              <th>Tính năng</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>001</td>
              <td>Nguyên văn A</td>
              <td>000 000 0000</td>
              <td>Universe</td>
              <td>11-11-1111 11:11</td>
              <td>100.000 VNĐ</td>
              <td>100.000 VNĐ</td>
              <td>Xóa</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default CardCustomersTable;
