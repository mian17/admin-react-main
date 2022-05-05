import { useFormik } from "formik";

const WAREHOUSES = ["TP. Hồ Chí Minh", "Hà Nội", "Đà Nẵng", "Khánh Hòa"];
const SELLERS = ["Nguyễn Văn A", "Nguyễn Thị B", "Trần Đình C", "Ngô Đỗ Thị D"];

// REGEXES
const ID_REGEX = /^\d{9}$/;

const VIETNAMESE_REGEX =
  /\b\S*[AĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴA-Z]+\S*\b/;
const NO_NUM_REGEX = /^(\D*)$/;
const MONEY_REGEX = /^\d*$/;

const makeId = (length) => {
  let result = "";
  const characters = "0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const validate = (values) => {
  const errors = {};

  // orderAddId
  if (!values.orderAddId) {
    errors.orderAddId = "Hệ thống sự tự động thêm mã mới";
  } else if (!ID_REGEX.test(values.orderAddId)) {
    errors.orderAddId = "Mã đơn hàng phải có 9 chữ số";
  }

  // orderAddCustomerName
  if (!values.orderAddCustomerName) {
    errors.orderAddCustomerName = "Chưa nhập tên khách hàng.";
  } else if (values.orderAddCustomerName.length < 6) {
    errors.orderAddCustomerName =
      "Tên khách hàng phải trên 6 ký tự, bao gồm khoảng trống.";
  } else if (
    !VIETNAMESE_REGEX.test(values.orderAddCustomerName) &&
    values.orderAddCustomerName.length >= 6
  ) {
    errors.orderAddCustomerName =
      "Tên khách hàng không được bao gồm số, ký tự đặc biệt và phải viết in hoa.";
  }

  return errors;
};

// COMPONENT'S FUNCTION
const OrderAdd = (props) => {
  const formik = useFormik({
    initialValues: {
      orderAddId: `${makeId(9)}`,
      orderAddCustomerName: "",
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  // const customerInputClasses = customerNameHasError
  //   ? "form-control is-invalid"
  //   : "form-control";
  //
  // let formIsValid = false;
  // formIsValid = customerNameIsValid;

  return (
    <div className="card card-primary">
      <div className="card-header">
        <h3 className="card-title">Tạo đơn hàng</h3>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div className="card-body">
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="orderAddId">Mã đơn hàng</label>
                <input
                  type="text"
                  className="form-control"
                  id="orderAddId"
                  placeholder="Nếu không nhập, hệ thống sẽ tự thêm"
                  name="orderAddId"
                  value={formik.values.orderAddId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.orderAddId && formik.touched.orderAddId ? (
                  <div className="text-red mt-1 ml-1">
                    {formik.errors.orderAddId}
                  </div>
                ) : null}
              </div>
              <div className="form-group">
                <label>Kho xuất</label>
                <select
                  className="custom-select"
                  name="warehouse"
                  // onChange={changeWarehouseHandler}
                  // onBlur={validateWarehouseHandler}
                >
                  {WAREHOUSES.map((warehouse, i) => {
                    return <option key={i}>{warehouse}</option>;
                  })}
                </select>
              </div>

              <div className="form-group">
                <label>Thu ngân</label>
                <select
                  className="custom-select"
                  name="seller"
                  // onChange={changeSellerHandler}
                  // onBlur={validateSellerHandler}
                >
                  {SELLERS.map((sellerName, i) => {
                    return <option key={sellerName[i]}>{sellerName}</option>;
                  })}
                </select>
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="orderAddCustomerName">Khách hàng</label>
                <input
                  className="form-control"
                  id="orderAddCustomerName"
                  name="orderAddCustomerName"
                  type="text"
                  placeholder="Nhập tên khách hàng"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.orderAddCustomerName}
                />

                {formik.errors.orderAddCustomerName &&
                formik.touched.orderAddCustomerName ? (
                  <div className="text-red mt-1 ml-1">
                    {formik.errors.orderAddCustomerName}
                  </div>
                ) : null}
              </div>

              <div className="form-group">
                <label>Thời điểm bán:</label>
                {/*// NEEDS TO FIX DATE TIME*/}
                {/*<DatePicker className="input-group date" />*/}
                <div
                  className="input-group date"
                  id="order-add-form-date"
                  data-target-input="nearest"
                  // onBlur={blurDateTimeHandler}
                >
                  <input
                    type="text"
                    className="form-control datetimepicker-input"
                    data-target="#order-add-form-date"
                    name="dateTime"
                  />
                  <div
                    className="input-group-append"
                    data-target="#order-add-form-date"
                    data-toggle="datetimepicker"
                  >
                    <div className="input-group-text">
                      <i className="fa fa-calendar"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="total-money">Tổng tiền</label>
                <input
                  type="number"
                  className="form-control"
                  id="total-money"
                  placeholder="0 VNĐ"
                  min="0"
                  step="1000"
                  name="totalAmount"
                  // onChange={changeTotalMoneyHandler}
                  // onBlur={validateTotalMoneyHandler}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="card-footer">
          <button
            // onClick={addOrderHandler}
            type="submit"
            className="btn btn-primary float-right"
          >
            Thêm đơn hàng
          </button>
        </div>
      </form>
    </div>
  );
};
export default OrderAdd;
