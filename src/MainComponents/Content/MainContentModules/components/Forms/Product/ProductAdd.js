const ProductAdd = () => {
  return (
    <div className="card card-primary">
      <div className="card-header">
        <h3 className="card-title">Tạo sản phẩm</h3>
      </div>

      <form>
        <div className="card-body">
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="product-name">Tên sản phẩm</label>
                <input
                  type="text"
                  className="form-control"
                  id="product-name"
                  placeholder="Nhập tên sản phẩm"
                />
              </div>
              <div className="form-group">
                <label htmlFor="inputFile">Hình ảnh sản phẩm</label>
                <div className="input-group">
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="inputFile"
                    />
                    <label className="custom-file-label" htmlFor="inputFile">
                      Chọn hình ảnh
                    </label>
                  </div>
                  <div className="input-group-append">
                    <span className="input-group-text">Gửi ảnh</span>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="product-quantity">Số lượng</label>
                <input
                  type="number"
                  className="form-control"
                  id="product-quantity"
                  placeholder="0"
                  min="0"
                  max="9999"
                />
              </div>
              <div className="form-group">
                <label htmlFor="product-prime-cost">Giá vốn</label>
                <input
                  type="number"
                  className="form-control"
                  id="product-prime-cost"
                  placeholder="0 VNĐ"
                  min="0"
                />
              </div>
              <div className="form-group">
                <label htmlFor="product-price">Giá bán</label>
                <input
                  type="number"
                  className="form-control"
                  id="product-price"
                  placeholder="0 VNĐ"
                  min="0"
                />
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="product-id">Mã sản phẩm</label>
                <input
                  type="text"
                  className="form-control"
                  id="product-id"
                  placeholder="Nếu không nhập, hệ thống sẽ tự thêm"
                />
              </div>
              <div className="form-group">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="stock-check"
                  />
                  <label className="form-check-label" htmlFor="stock-check">
                    Theo dõi tồn kho
                  </label>
                </div>
              </div>
              <div className="form-group">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="out-of-stock-sell-check"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="out-of-stock-sell-check"
                  >
                    Cho phép bán âm
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>Danh mục</label>
                <select className="custom-select">
                  <option>Nhà cửa</option>
                  <option>Điện tử</option>
                  <option>Thiết bị số</option>
                  <option>Điện thoại</option>
                  <option>Gia dụng</option>
                </select>
              </div>
              <div className="form-group">
                <label>Nhà sản xuất</label>
                <select className="custom-select">
                  <option>Samsung</option>
                  <option>Apple</option>
                  <option>Hitachi</option>
                  <option>Acer</option>
                  <option>Asus</option>
                </select>
              </div>
            </div>
            <div className="col-12">
              <div className="card card-outline card-info">
                <div className="card-header">
                  <h3 className="card-title">Điền thông tin mô tả sản phẩm</h3>
                </div>

                <div className="card-body">
                  <textarea id="product-description"></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card-footer">
          <button type="submit" className="btn btn-primary">
            Thêm sản phẩm
          </button>
        </div>
      </form>
    </div>
  );
};
export default ProductAdd;
