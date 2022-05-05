import { useState, useEffect } from "react";
import useInput from "../../../../../../hooks/use-input";
// import { useFormik } from "formik";

const WAREHOUSES = ["TP. Hồ Chí Minh", "Hà Nội", "Đà Nẵng", "Khánh Hòa"];
const SELLERS = ["Nguyễn Văn A", "Nguyễn Thị B", "Trần Đình C", "Ngô Đỗ Thị D"];

// REGEXES
const ID_REGEX = /^\d{9}$/;
const VIETNAMESE_REGEX =
  /\b\S*[AĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴA-Z]+\S*\b/;
const NO_NUM_REGEX = /^(\D*)$/;
const MONEY_REGEX = /^\d*$/;

const checkViName = (value) => {
  return VIETNAMESE_REGEX.test(value) && value.trim() !== "";
};

// COMPONENT'S FUNCTION
const OrderAdd = (props) => {
  const {
    value: customerNameInput,
    isValid: customerNameIsValid,
    hasError: customerNameHasError,
    errorMessage: customerNameErrorMessage,
    changeValueHandler: changeCustomerNameHandler,
    blurValueHandler: blurCustomerNameHandler,
  } = useInput(checkViName);

  // const [errorMessage, setErrorMessage] = useState("");
  // useEffect(() => {
  //   if (customerNameInput.trim() === "")
  //     setErrorMessage("Chưa nhập tên khách hàng");
  //   if (
  //     !VIETNAMESE_REGEX.test(customerNameInput) &&
  //     customerNameInput.trim() !== ""
  //   )
  //     setErrorMessage(
  //       "Tên khách hàng không được bao gồm số, ký tự đặc biệt và phải viết in hoa."
  //     );
  //
  //   return () => {};
  // }, [errorMessage, customerNameInput, setErrorMessage]);
  //
  // console.log(customerNameIsValid);

  const customerInputClasses = customerNameHasError
    ? "form-control is-invalid"
    : "form-control";

  let formIsValid = false;
  formIsValid = customerNameIsValid;

  return (
    <div className="card card-primary">
      <div className="card-header">
        <h3 className="card-title">Tạo đơn hàng</h3>
      </div>

      <form>
        <div className="card-body">
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="product-id">Mã đơn hàng</label>
                <input
                  type="text"
                  className="form-control"
                  id="product-id"
                  placeholder="Nếu không nhập, hệ thống sẽ tự thêm"
                  name="id"
                  // onChange={changeIdHandler}
                  // onBlur={validateIdHandler}
                />
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
                <label htmlFor="customer-order-form-name">Khách hàng</label>
                <input
                  type="text"
                  className={customerInputClasses}
                  id="customer-order-form-name"
                  placeholder="Nhập tên khách hàng"
                  name="customer"
                  value={customerNameInput}
                  onChange={changeCustomerNameHandler}
                  onBlur={blurCustomerNameHandler}
                />
                <div className="invalid-feedback">
                  {customerNameErrorMessage}
                </div>
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
            type="button"
            className="btn btn-primary float-right"
            disabled={!formIsValid}
          >
            Thêm đơn hàng
          </button>
        </div>
      </form>
    </div>
  );
};
export default OrderAdd;
