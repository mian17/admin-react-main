// import { useFormik } from "formik";
//
// import DatePicker from "react-datepicker";
// import vi from "date-fns/locale/vi";
// import { SELLERS, WAREHOUSES } from "../../../../../../pages/OrderContent";
// import {
//   ID_REGEX,
//   MONEY_REGEX,
//   VIETNAMESE_REGEX,
// } from "../../../../../../utilities/regex-utils";
//
// const validate = (values) => {
//   const errors = {};
//   // orderAddId
//   if (!values.modalEditOrderId) {
//     errors.modalEditOrderId = "Chưa nhập mã đơn hàng";
//   } else if (!ID_REGEX.test(values.modalEditOrderId)) {
//     errors.modalEditOrderId =
//       "Mã đơn hàng phải có 9 chữ số và không bao gồm chữ cái, khoảng trống.";
//   }
//
//   // orderAddWarehouse
//   if (!values.modalEditOrderWarehouse) {
//     errors.modalEditOrderWarehouse = "Vui lòng chọn kho.";
//   } else if (values.modalEditOrderWarehouse.length < 6) {
//     errors.modalEditOrderWarehouse =
//       "Tên kho phải trên 6 ký tự, bao gồm khoảng trống.";
//   } else if (!WAREHOUSES.includes(values.modalEditOrderWarehouse)) {
//     errors.modalEditOrderWarehouse =
//       "Kho bạn chọn không nằm trong danh sách kho.";
//   }
//
//   // orderAddSeller
//   if (!values.modalEditOrderSeller) {
//     errors.modalEditOrderSeller = "Vui lòng chọn thu ngân.";
//   } else if (values.modalEditOrderSeller.length < 6) {
//     errors.modalEditOrderSeller =
//       "Tên thu ngân phải trên 6 ký tự, bao gồm khoảng trống.";
//   } else if (!SELLERS.includes(values.modalEditOrderSeller)) {
//     errors.modalEditOrderSeller =
//       "Người bạn chọn không nằm trong danh sách thu ngân.";
//   }
//
//   // orderAddCustomerName
//   if (!values.modalEditOrderCustomerName) {
//     errors.modalEditOrderCustomerName = "Chưa nhập tên khách hàng.";
//   } else if (values.modalEditOrderCustomerName.length < 6) {
//     errors.modalEditOrderCustomerName =
//       "Tên khách hàng phải trên 6 ký tự, bao gồm khoảng trống.";
//   } else if (
//     !VIETNAMESE_REGEX.test(values.modalEditOrderCustomerName) &&
//     values.modalEditOrderCustomerName.length >= 6
//   ) {
//     errors.modalEditOrderCustomerName =
//       "Tên khách hàng không được bao gồm số, ký tự đặc biệt và phải viết in hoa.";
//   }
//
//   // orderAddDateTime
//   if (!values.modalEditOrderDateTime) {
//     errors.modalEditOrderDateTime = "Chưa nhập thời điểm bán đơn hàng";
//   } else if (!(values.modalEditOrderDateTime instanceof Date)) {
//     errors.modalEditOrderDateTime =
//       "Dữ liệu nhập không có cấu trúc thời gian của JS";
//   }
//
//   // orderAddTotalMoney
//   if (!values.modalEditOrderTotalMoney) {
//     errors.modalEditOrderTotalMoney = "Chưa nhập tổng tiền của đơn hàng";
//   } else if (!MONEY_REGEX.test(values.modalEditOrderTotalMoney)) {
//     errors.modalEditOrderTotalMoney =
//       "Tổng tiền phải là số và không có khoảng trống";
//   }
//   return errors;
// };
//
// const ModalEditOrder = (props) => {
//   const orderData = !props.orderDetails ? {} : props.orderDetails;
//   const formik = useFormik({
//     initialValues: {
//       modalEditOrderId: orderData.orderAddId,
//       modalEditOrderWarehouse: orderData.orderAddWarehouse,
//       modalEditOrderDateTime: orderData.orderAddDateTime,
//       modalEditOrderSeller: orderData.orderAddSeller,
//       modalEditOrderCustomerName: orderData.orderAddCustomerName,
//       modalEditOrderStatus: orderData.orderAddStatus,
//       modalEditOrderTotalMoney: orderData.orderAddTotalMoney,
//     },
//     validate,
//     enableReinitialize: true,
//     onSubmit: (editedOrder, { resetForm }) => {
//       props.editOrderFunc(editedOrder);
//       resetForm();
//     },
//   });
//   let formIsValid;
//   formIsValid = Object.keys(formik.errors).length === 0;
//
//   return (
//     <div
//       className={"modal fade modal-for-order-id-" + props.orderIndex}
//       tabIndex="-1"
//       role="dialog"
//       aria-labelledby="modalToEditOrder"
//       aria-hidden="true"
//     >
//       <div className="modal-dialog modal-lg">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h5 className="modal-title">
//               Điều chỉnh đơn hàng #{formik.values.modalEditOrderId}
//             </h5>
//             <button
//               type="button"
//               className="close"
//               data-dismiss="modal"
//               aria-label="Close"
//             >
//               <span aria-hidden="true">&times;</span>
//             </button>
//           </div>
//           <div className="modal-body">
//             <div className="row">
//               <div className="col-md-6">
//                 <div className="form-group">
//                   <label htmlFor="modalEditOrderId">Mã đơn hàng</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="modalEditOrderId"
//                     name="modalEditOrderId"
//                     defaultValue={formik.values.modalEditOrderId}
//                     onKeyDown={(e) => {
//                       alert("Bạn không được phép sửa đổi mã đơn hàng");
//                       e.preventDefault();
//                     }}
//                     readOnly
//                     disabled
//                     // onChange={formik.values.handleChange}
//                     // onBlur={formik.values.handleBlur}
//                   />
//                   {/*{formik.errors.modalEditOrderId &&*/}
//                   {/*formik.touched.modalEditOrderId ? (*/}
//                   {/*  <div className="text-red mt-1 ml-1">*/}
//                   {/*    {formik.errors.modalEditOrderId}*/}
//                   {/*  </div>*/}
//                   {/*) : null}*/}
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="modalEditOrderWarehouse">Kho xuất</label>
//                   <select
//                     className="custom-select"
//                     name="modalEditOrderWarehouse"
//                     id="modalEditOrderWarehouse"
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     value={formik.values.modalEditOrderWarehouse}
//                   >
//                     {WAREHOUSES.map((warehouse, i) => {
//                       return <option key={i}>{warehouse}</option>;
//                     })}
//                   </select>
//                   {formik.errors.modalEditOrderWarehouse &&
//                   formik.touched.modalEditOrderWarehouse ? (
//                     <div className="text-red mt-1 ml-1">
//                       {formik.errors.modalEditOrderWarehouse}
//                     </div>
//                   ) : null}
//                 </div>
//
//                 <div className="form-group">
//                   <label htmlFor="modalEditOrderSeller">Thu ngân</label>
//                   <select
//                     className="custom-select"
//                     name="modalEditOrderSeller"
//                     id="modalEditOrderSeller"
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     value={formik.values.modalEditOrderSeller}
//                   >
//                     {SELLERS.map((sellerName, i) => {
//                       return <option key={sellerName[i]}>{sellerName}</option>;
//                     })}
//                   </select>
//                   {formik.errors.modalEditOrderSeller &&
//                   formik.touched.modalEditOrderSeller ? (
//                     <div className="text-red mt-1 ml-1">
//                       {formik.errors.modalEditOrderSeller}
//                     </div>
//                   ) : null}
//                 </div>
//               </div>
//               <div className="col-md-6">
//                 <div className="form-group">
//                   <label htmlFor="modalEditOrderCustomerName">Khách hàng</label>
//                   <input
//                     className="form-control"
//                     id="modalEditOrderCustomerName"
//                     name="modalEditOrderCustomerName"
//                     type="text"
//                     placeholder="Nhập tên khách hàng"
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     value={formik.values.modalEditOrderCustomerName}
//                   />
//
//                   {formik.errors.modalEditOrderCustomerName &&
//                   formik.touched.modalEditOrderCustomerName ? (
//                     <div className="text-red mt-1 ml-1">
//                       {formik.errors.modalEditOrderCustomerName}
//                     </div>
//                   ) : null}
//                 </div>
//
//                 <div className="form-group">
//                   <label htmlFor="modalEditOrderDateTime">Thời điểm bán:</label>
//                   <DatePicker
//                     name="modalEditOrderDateTime"
//                     id="modalEditOrderDateTime"
//                     className="form-control"
//                     selected={formik.values.modalEditOrderDateTime}
//                     value={formik.values.modalEditOrderDateTime}
//                     onChange={(date) =>
//                       formik.setFieldValue("modalEditOrderDateTime", date)
//                     }
//                     onBlur={formik.handleBlur}
//                     locale={vi}
//                     dateFormat="dd/MM/yyyy hh:mm"
//                     timeCaption="Thời gian"
//                     timeIntervals={15}
//                     showTimeSelect
//                     maxDate={new Date()}
//                     onKeyDown={(e) => {
//                       e.preventDefault();
//                     }}
//                   />
//                   {formik.errors.modalEditOrderDateTime &&
//                   formik.touched.modalEditOrderDateTime ? (
//                     <div className="text-red mt-1 ml-1">
//                       {formik.errors.modalEditOrderDateTime}
//                     </div>
//                   ) : null}
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="modalEditOrderTotalMoney">Tổng tiền</label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     id="modalEditOrderTotalMoney"
//                     name="modalEditOrderTotalMoney"
//                     placeholder="0 VNĐ"
//                     min="0"
//                     step="1000"
//                     value={formik.values.modalEditOrderTotalMoney}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                   />
//                   {formik.errors.modalEditOrderTotalMoney &&
//                   formik.touched.modalEditOrderTotalMoney ? (
//                     <div className="text-red mt-1 ml-1">
//                       {formik.errors.modalEditOrderTotalMoney}
//                     </div>
//                   ) : null}
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="modal-footer">
//             <button
//               type="button"
//               className="btn btn-secondary"
//               data-dismiss="modal"
//             >
//               Hủy
//             </button>
//             <button
//               type="submit"
//               className="btn btn-primary"
//               onClick={formik.handleSubmit}
//               disabled={!formIsValid}
//               data-dismiss="modal"
//             >
//               Lưu thay đổi
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default ModalEditOrder;
