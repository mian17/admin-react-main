import { useFormik } from "formik";

import { SELLERS, WAREHOUSES } from "../../../../../../pages/OrderContent";
import {
  ID_REGEX,
  MONEY_REGEX,
  VIETNAMESE_REGEX,
} from "../../../../../../utilities/regex-utils";

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import vi from "date-fns/locale/vi";

registerLocale("vi", vi);

const makeId = (length) => {
  let result = "";
  const characters = "0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

// REGEXES
// const ID_REGEX = /^\d{9}$/;
//
// const VIETNAMESE_REGEX =
//   /\b\S*[AĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴA-Z]+\S*\b/;
// const NO_NUM_REGEX = /^(\D*)$/;
// const MONEY_REGEX = /^\d*$/;
// const DATE_TIME_VI_REGEX =
//   /(0[1-9]|[1-2]\d|3[0-1])\/(0[1-9]|1[0-2])\/\d{4} (2[0-3]|[01]\d):[0-5]\d/;

// COMPONENT'S FUNCTION
const OrderAdd = (props) => {
  const validate = (values) => {
    const errors = {};
    // orderAddId
    if (!values.orderAddId) {
      errors.orderAddId = "Chưa nhập mã đơn hàng";
    } else if (!ID_REGEX.test(values.orderAddId)) {
      errors.orderAddId =
        "Mã đơn hàng phải có 9 chữ số và không bao gồm chữ cái, khoảng trống.";
    }

    // orderAddWarehouse
    if (!values.orderAddWarehouse) {
      errors.orderAddWarehouse = "Vui lòng chọn kho.";
    } else if (values.orderAddWarehouse.length < 6) {
      errors.orderAddWarehouse =
        "Tên kho phải trên 6 ký tự, bao gồm khoảng trống.";
    } else if (!WAREHOUSES.includes(values.orderAddWarehouse)) {
      errors.orderAddWarehouse = "Kho bạn chọn không nằm trong danh sách kho.";
    }

    // orderAddSeller
    if (!values.orderAddSeller) {
      errors.orderAddSeller = "Vui lòng chọn thu ngân.";
    } else if (values.orderAddSeller.length < 6) {
      errors.orderAddSeller =
        "Tên thu ngân phải trên 6 ký tự, bao gồm khoảng trống.";
    } else if (!SELLERS.includes(values.orderAddSeller)) {
      errors.orderAddSeller =
        "Người bạn chọn không nằm trong danh sách thu ngân.";
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

    // orderAddDateTime
    if (!values.orderAddDateTime) {
      errors.orderAddDateTime = "Chưa nhập thời điểm bán đơn hàng";
    } else if (!(values.orderAddDateTime instanceof Date)) {
      errors.orderAddDateTime =
        "Dữ liệu nhập không có cấu trúc thời gian của JS";
    }

    // orderAddTotalMoney
    if (!values.orderAddTotalMoney) {
      errors.orderAddTotalMoney = "Chưa nhập tổng tiền của đơn hàng";
    } else if (!MONEY_REGEX.test(values.orderAddTotalMoney)) {
      errors.orderAddTotalMoney =
        "Tổng tiền phải là số và không có khoảng trống";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      orderAddId: makeId(9),
      orderAddWarehouse: props.warehouses[0],
      orderAddDateTime: new Date(),
      orderAddSeller: props.sellers[0],
      orderAddCustomerName: "",
      orderAddStatus: "Chờ xác nhận đơn",
      orderAddTotalMoney: 1000,
    },
    validate,
    onSubmit: (order, { resetForm }) => {
      props.onClick(order);
      resetForm();
    },
  });
  let formIsValid;
  formIsValid = Object.keys(formik.errors).length === 0;

  return (
    <div className="card card-primary">
      <div className="card-header">
        <h3 className="card-title">Tạo đơn hàng</h3>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
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
                  name="orderAddWarehouse"
                  id="orderAddWarehouse"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.orderAddWarehouse}
                >
                  {props.warehouses.map((warehouse, i) => {
                    return <option key={i}>{warehouse}</option>;
                  })}
                </select>
                {formik.errors.orderAddWarehouse &&
                formik.touched.orderAddWarehouse ? (
                  <div className="text-red mt-1 ml-1">
                    {formik.errors.orderAddWarehouse}
                  </div>
                ) : null}
              </div>

              <div className="form-group">
                <label>Thu ngân</label>
                <select
                  className="custom-select"
                  name="orderAddSeller"
                  id="orderAddSeller"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.orderAddSeller}
                >
                  {props.sellers.map((sellerName, i) => {
                    return <option key={sellerName[i]}>{sellerName}</option>;
                  })}
                </select>
                {formik.errors.orderAddSeller &&
                formik.touched.orderAddSeller ? (
                  <div className="text-red mt-1 ml-1">
                    {formik.errors.orderAddSeller}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="col-md-6">
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
                <label htmlFor="orderAddDateTime">Thời điểm bán:</label>
                <DatePicker
                  name="orderAddDateTime"
                  id="orderAddDateTime"
                  className="form-control"
                  selected={formik.values.orderAddDateTime}
                  value={formik.values.orderAddDateTime}
                  onChange={(date) =>
                    formik.setFieldValue("orderAddDateTime", date)
                  }
                  onBlur={formik.handleBlur}
                  locale={vi}
                  dateFormat="dd/MM/yyyy hh:mm"
                  timeCaption="Thời gian"
                  timeIntervals={15}
                  showTimeSelect
                  maxDate={new Date()}
                  onKeyDown={(e) => {
                    e.preventDefault();
                  }}
                />
                {formik.errors.orderAddDateTime &&
                formik.touched.orderAddDateTime ? (
                  <div className="text-red mt-1 ml-1">
                    {formik.errors.orderAddDateTime}
                  </div>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="total-money">Tổng tiền</label>
                <input
                  type="number"
                  className="form-control"
                  id="orderAddTotalMoney"
                  name="orderAddTotalMoney"
                  placeholder="0 VNĐ"
                  min="0"
                  step="1000"
                  value={formik.values.orderAddTotalMoney}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.orderAddTotalMoney &&
                formik.touched.orderAddTotalMoney ? (
                  <div className="text-red mt-1 ml-1">
                    {formik.errors.orderAddTotalMoney}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <button
            disabled={!formIsValid}
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
