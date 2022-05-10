import DatePicker from "react-datepicker";
import vi from "date-fns/locale/vi";

const OrderForm = (props) => {
  return (
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
            value={props.formikObj.values.orderAddId}
            onChange={props.formikObj.handleChange}
            onBlur={props.formikObj.handleBlur}
          />
          {props.formikObj.errors.orderAddId &&
          props.formikObj.touched.orderAddId ? (
            <div className="text-red mt-1 ml-1">
              {props.formikObj.errors.orderAddId}
            </div>
          ) : null}
        </div>
        <div className="form-group">
          <label>Kho xuất</label>
          <select
            className="custom-select"
            name="orderAddWarehouse"
            id="orderAddWarehouse"
            onChange={props.formikObj.handleChange}
            onBlur={props.formikObj.handleBlur}
            value={props.formikObj.values.orderAddWarehouse}
          >
            {props.warehouses.map((warehouse, i) => {
              return <option key={i}>{warehouse}</option>;
            })}
          </select>
          {props.formikObj.errors.orderAddWarehouse &&
          props.formikObj.touched.orderAddWarehouse ? (
            <div className="text-red mt-1 ml-1">
              {props.formikObj.errors.orderAddWarehouse}
            </div>
          ) : null}
        </div>

        <div className="form-group">
          <label>Thu ngân</label>
          <select
            className="custom-select"
            name="orderAddSeller"
            id="orderAddSeller"
            onChange={props.formikObj.handleChange}
            onBlur={props.formikObj.handleBlur}
            value={props.formikObj.values.orderAddSeller}
          >
            {props.sellers.map((sellerName, i) => {
              return <option key={sellerName[i]}>{sellerName}</option>;
            })}
          </select>
          {props.formikObj.errors.orderAddSeller &&
          props.formikObj.touched.orderAddSeller ? (
            <div className="text-red mt-1 ml-1">
              {props.formikObj.errors.orderAddSeller}
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
            onChange={props.formikObj.handleChange}
            onBlur={props.formikObj.handleBlur}
            value={props.formikObj.values.orderAddCustomerName}
          />

          {props.formikObj.errors.orderAddCustomerName &&
          props.formikObj.touched.orderAddCustomerName ? (
            <div className="text-red mt-1 ml-1">
              {props.formikObj.errors.orderAddCustomerName}
            </div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="orderAddDateTime">Thời điểm bán:</label>
          <DatePicker
            name="orderAddDateTime"
            id="orderAddDateTime"
            className="form-control"
            selected={props.formikObj.values.orderAddDateTime}
            value={props.formikObj.values.orderAddDateTime}
            onChange={(date) =>
              props.formikObj.setFieldValue("orderAddDateTime", date)
            }
            onBlur={props.formikObj.handleBlur}
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
          {props.formikObj.errors.orderAddDateTime &&
          props.formikObj.touched.orderAddDateTime ? (
            <div className="text-red mt-1 ml-1">
              {props.formikObj.errors.orderAddDateTime}
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
            value={props.formikObj.values.orderAddTotalMoney}
            onChange={props.formikObj.handleChange}
            onBlur={props.formikObj.handleBlur}
          />
          {props.formikObj.errors.orderAddTotalMoney &&
          props.formikObj.touched.orderAddTotalMoney ? (
            <div className="text-red mt-1 ml-1">
              {props.formikObj.errors.orderAddTotalMoney}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default OrderForm;
