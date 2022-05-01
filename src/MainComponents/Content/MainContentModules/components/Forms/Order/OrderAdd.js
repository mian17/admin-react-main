import { useState, useEffect, useReducer } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const WAREHOUSES = ["TP. Hồ Chí Minh", "Hà Nội", "Đà Nẵng", "Khánh Hòa"];
const SELLERS = ["Nguyễn Văn A", "Nguyễn Thị B", "Trần Đình C", "Ngô Đỗ Thị D"];

// REGEXES
const ID_REGEX = /^\d{9}$/;
const VIETNAMESE_REGEX =
  /\b\S*[AĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴAĂÂÁẮẤÀẰẦẢẲẨÃẴẪẠẶẬĐEÊÉẾÈỀẺỂẼỄẸỆIÍÌỈĨỊOÔƠÓỐỚÒỒỜỎỔỞÕỖỠỌỘỢUƯÚỨÙỪỦỬŨỮỤỰYÝỲỶỸỴA-Z]+\S*\b/;
const NO_NUM_REGEX = /^(\D*)$/;
const MONEY_REGEX = /^\d*$/;

// Reducer's functions
const idReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: ID_REGEX.test(action.val) };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: ID_REGEX.test(state.value) };
  }

  return { value: "", isValid: false };
};
const warehouseReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: VIETNAMESE_REGEX.test(action.val) };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: VIETNAMESE_REGEX.test(state.value) };
  }
  return { value: "", isValid: false };
};
const sellerReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: VIETNAMESE_REGEX.test(action.val) };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: VIETNAMESE_REGEX.test(state.value) };
  }
  return { value: "", isValid: false };
};
const customerReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.val,
      isValid:
        VIETNAMESE_REGEX.test(action.val) && NO_NUM_REGEX.test(action.val),
    };
  }
  if (action.type === "INPUT_BLUR") {
    return {
      value: state.value,
      isValid:
        VIETNAMESE_REGEX.test(state.value) && NO_NUM_REGEX.test(state.value),
    };
  }
  return { value: "", isValid: false };
};
const dateTimeReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: true };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: true };
  }
  return { value: "", isValid: false };
};
const totalMoneyReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: MONEY_REGEX.test(action.val) };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: MONEY_REGEX.test(state.value) };
  }

  return { value: "", isValid: false };
};
// COMPONENT'S FUNCTION
const OrderAdd = (props) => {
  // Form State
  const [validForm, setValidForm] = useState(false);

  // Form info states
  const [idState, dispatchId] = useReducer(idReducer, {
    value: "",
    isValid: false,
  });
  const [warehouseState, dispatchWarehouse] = useReducer(warehouseReducer, {
    value: WAREHOUSES[0],
    isValid: VIETNAMESE_REGEX.test(WAREHOUSES[0]),
  });
  const [sellerState, dispatchSeller] = useReducer(sellerReducer, {
    value: SELLERS[0],
    isValid: VIETNAMESE_REGEX.test(SELLERS[0]),
  });
  const [customerState, dispatchCustomer] = useReducer(customerReducer, {
    value: "",
    isValid: false,
  });

  // NEEDS TO FIX DATE TIME
  const [dateTimeState, dispatchDateTime] = useReducer(dateTimeReducer, {
    value: "",
    isValid: false,
  });
  const [totalMoneyState, dispatchTotalMoney] = useReducer(totalMoneyReducer, {
    value: 0,
    isValid: false,
  });

  // Form infos onChange and validate (onBlur) Handlers
  // Id
  const changeIdHandler = (e) => {
    dispatchId({ type: "USER_INPUT", val: e.target.value });
  };
  const validateIdHandler = () => {
    dispatchId({ type: "INPUT_BLUR" });
  };

  // Warehouse
  const changeWarehouseHandler = (e) => {
    dispatchWarehouse({ type: "USER_INPUT", val: e.target.value });
  };
  const validateWarehouseHandler = () => {
    dispatchWarehouse({ type: "INPUT_BLUR" });
  };

  // Seller
  const changeSellerHandler = (e) => {
    dispatchSeller({ type: "USER_INPUT", val: e.target.value });
  };
  const validateSellerHandler = () => {
    dispatchSeller({ type: "INPUT_BLUR" });
  };

  // Customer
  const changeCustomerHandler = (e) => {
    dispatchCustomer({ type: "USER_INPUT", val: e.target.value });
  };
  const validateCustomerHandler = () => {
    dispatchCustomer({ type: "INPUT_BLUR" });
  };

  // NEED TO FIX DATE TIME
  // DateTime
  const changeDateTimeHandler = (e) => {
    dispatchDateTime({ type: "USER_INPUT", val: e.target.value });
  };
  const validateDateTimeHandler = () => {
    dispatchDateTime({ type: "INPUT_BLUR" });
  };

  // Money
  const changeTotalMoneyHandler = (e) => {
    dispatchTotalMoney({ type: "USER_INPUT", val: +e.target.value });
  };
  const validateTotalMoneyHandler = () => {
    dispatchTotalMoney({ type: "INPUT_BLUR" });
  };

  /*--------------------------------*/
  // Console logs to check for errors
  /*--------------------------------*/
  console.log(dateTimeState);

  // console.log(customerState);
  // console.log(totalMoneyState);
  const { isValid: idIsValid, value: idValue } = idState;
  const { isValid: warehouseIsValid, value: warehouseValue } = warehouseState;
  const { isValid: sellerIsValid, value: sellerValue } = sellerState;
  const { isValid: customerIsValid, value: customerValue } = customerState;
  const { isValid: dateTimeIsValid, value: dateTimeValue } = dateTimeState;
  const { isValid: totalMoneyIsValid, value: totalMoneyValue } =
    totalMoneyState;

  useEffect(() => {
    const checkingValidityTimer = setTimeout(() => {
      setValidForm(
        idIsValid &&
          warehouseIsValid &&
          sellerIsValid &&
          customerIsValid &&
          dateTimeIsValid &&
          totalMoneyIsValid
      );
    }, 500);
    return () => {
      clearTimeout(checkingValidityTimer);
    };
  }, [
    idIsValid,
    warehouseIsValid,
    sellerIsValid,
    customerIsValid,
    dateTimeIsValid,
    totalMoneyIsValid,
  ]);

  /*--------------------------------*/
  // Function for add order
  /*--------------------------------*/

  const addOrderHandler = () => {
    if (validForm) {
      let newOrder = {
        idValue,
        warehouseValue,
        sellerValue,
        customerValue,
        dateTimeValue,
        totalMoneyValue,
      };
      props.onClick(newOrder);
    }
  };

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
                  onChange={changeIdHandler}
                  onBlur={validateIdHandler}
                />
              </div>
              <div className="form-group">
                <label>Kho xuất</label>
                <select
                  className="custom-select"
                  name="warehouse"
                  onChange={changeWarehouseHandler}
                  onBlur={validateWarehouseHandler}
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
                  onChange={changeSellerHandler}
                  onBlur={validateSellerHandler}
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
                  className="form-control"
                  id="customer-order-form-name"
                  placeholder="Nhập tên khách hàng"
                  name="customer"
                  onChange={changeCustomerHandler}
                  onBlur={validateCustomerHandler}
                />
              </div>

              <div className="form-group">
                <label>Thời điểm bán:</label>
                {/*// NEEDS TO FIX DATE TIME*/}
                {/*<DatePicker className="input-group date" />*/}
                <div
                  className="input-group date"
                  id="order-add-form-date"
                  data-target-input="nearest"
                  onChange={changeDateTimeHandler}
                  onBlur={validateDateTimeHandler}
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
                  onChange={changeTotalMoneyHandler}
                  onBlur={validateTotalMoneyHandler}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="card-footer">
          <button
            onClick={addOrderHandler}
            type="button"
            className="btn btn-primary"
          >
            Thêm đơn hàng
          </button>
        </div>
      </form>
    </div>
  );
};
export default OrderAdd;
