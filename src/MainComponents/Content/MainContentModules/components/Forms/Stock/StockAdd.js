const StockAdd = () => {
  // Mã phiếu nhập, kho nhập, tình trạng, ngày nhập, người nhập, tổng tiền, nợ
  return (
    <div className="card card-primary">
      <div className="card-header">
        <h3 className="card-title">Tạo phiếu nhập kho</h3>
      </div>

      <form>
        <div className="card-body">
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="stock-add-form-id">Mã phiếu nhập</label>
                <input
                  type="text"
                  className="form-control"
                  id="stock-add-form-id"
                  placeholder="Nếu không nhập, hệ thống sẽ tự thêm"
                />
              </div>
              <div className="form-group">
                <label>Kho nhập</label>
                <select className="custom-select">
                  <option>TP. Hồ Chí Minh</option>
                  <option>Hà Nội</option>
                  <option>Đà Nẵng</option>
                  <option>Khánh Hòa</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="stock-add-form-date">Thời điểm nhập</label>
                <div
                  className="input-group date"
                  id="stock-add-form-date"
                  data-target-input="nearest"
                >
                  <input
                    type="text"
                    className="form-control datetimepicker-input"
                    data-target="#stock-add-form-date"
                  />
                  <div
                    className="input-group-append"
                    data-target="#stock-add-form-date"
                    data-toggle="datetimepicker"
                  >
                    <div className="input-group-text">
                      <i className="fa fa-calendar"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="stock-add-form-warehouser">Người nhập</label>
                <input
                  type="text"
                  className="form-control"
                  id="stock-add-form-warehouser"
                />
              </div>

              <div className="form-group">
                <label htmlFor="stock-add-form-product-price-per-unit">
                  Đơn giá
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="stock-add-form-product-price-per-unit"
                  min="0"
                  step="10"
                  placeholder="0 VNĐ"
                />
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="stock-add-form-product-name">
                  Tên, nhãn hiệu, qui cách, phẩm chất vật tư (sản phẩm, hàng
                  hóa)
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="stock-add-form-product-name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="stock-add-form-product-model-number">
                  Mã số của sản phẩm
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="stock-add-form-product-model-number"
                />
              </div>
              <div className="form-group">
                <label htmlFor="stock-add-form-product-unit">Đơn vị tính</label>
                <input
                  type="text"
                  className="form-control"
                  id="stock-add-form-product-unit"
                />
              </div>
              <div className="form-group">
                <label htmlFor="stock-add-form-product-num-on-paper">
                  Số lượng theo chứng từ
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="stock-add-form-product-num-on-paper"
                  min="0"
                  step="10"
                  placeholder="0"
                />
              </div>
              <div className="form-group">
                <label htmlFor="stock-add-form-product-num-reality">
                  Số lượng thực nhập
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="stock-add-form-product-num-on-paper-reality"
                  min="0"
                  step="10"
                  placeholder="0"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="card-footer">
          <button type="submit" className="btn btn-primary">
            Thêm phiếu nhập kho
          </button>
        </div>
      </form>
    </div>
  );
};
export default StockAdd;
