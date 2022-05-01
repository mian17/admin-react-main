const CustomerAdd = () => {
  // Ma khach hang, ten kh, ngay sinh, gioi tinh, quoc tich, email dien thoai, dia chi, lan cuoi mua hang, tong tien hang, tong no

  // Ma khach hang, ten kh, ngay sinh, gioi tinh, quoc tich, email,  dien thoai, dia chi
  return (
    <div className="card card-primary">
      <div className="card-header">
        <h3 className="card-title">Tạo khách hàng</h3>
      </div>

      <form>
        <div className="card-body">
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="customer-add-form-id">Mã khách hàng</label>
                <input
                  type="text"
                  className="form-control"
                  id="customer-add-form-id"
                  placeholder="Nếu không nhập, hệ thống sẽ tự thêm"
                />
              </div>
              <div className="form-group">
                <label htmlFor="customer-add-form-name">Tên khách hàng</label>
                <input
                  type="text"
                  className="form-control"
                  id="customer-add-form-name"
                  placeholder="Nhập tên khách hàng"
                />
              </div>
              <div className="form-group">
                <label htmlFor="customer-add-form-birthdate">Ngày sinh</label>
                <div
                  className="input-group date"
                  id="customer-add-form-birthdate"
                  data-target-input="nearest"
                >
                  <input
                    type="text"
                    className="form-control datetimepicker-input"
                    data-target="#customer-add-form-birthdate"
                  />
                  <div
                    className="input-group-append"
                    data-target="#customer-add-form-birthdate"
                    data-toggle="datetimepicker"
                  >
                    <div className="input-group-text">
                      <i className="fa fa-calendar"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label>Giới tính</label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    value="nam"
                    id="customer-add-form-gender-male"
                  />
                  <label
                    htmlFor="customer-add-form-gender-male"
                    className="form-check-label"
                  >
                    Nam
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    value="nu"
                    id="customer-add-form-gender-female"
                  />
                  <label
                    htmlFor="customer-add-form-gender-female"
                    className="form-check-label"
                  >
                    Nữ
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    value="khac"
                    id="customer-add-form-gender-other"
                  />
                  <label
                    htmlFor="customer-add-form-gender-other"
                    className="form-check-label"
                  >
                    Other
                  </label>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label>Quốc tịch</label>
                <select className="custom-select">
                  <option>Việt Nam</option>
                  <option>Hoa Kỳ</option>
                  <option>Trung Quốc</option>
                  <option>Nhật Bản</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="customer-add-form-email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="customer-add-form-email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="customer-add-form-phone">Số điện thoại</label>
                <input
                  type="text"
                  className="form-control"
                  id="customer-add-form-phone"
                />
              </div>
              <div className="form-group">
                <label htmlFor="customer-add-form-address-1">Địa chỉ 1</label>
                <input
                  type="text"
                  className="form-control"
                  id="customer-add-form-address-1"
                />
              </div>
              <div className="form-group">
                <label htmlFor="customer-add-form-address-2">Địa chỉ 2</label>
                <input
                  type="text"
                  className="form-control"
                  id="customer-add-form-address-2"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="card-footer">
          <button type="submit" className="btn btn-primary">
            Thêm khách hàng
          </button>
        </div>
      </form>
    </div>
  );
};
export default CustomerAdd;
