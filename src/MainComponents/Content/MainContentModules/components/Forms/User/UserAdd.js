import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import vi from "date-fns/locale/vi";
import { UserSchema } from "../../../../../../common/utils/validationSchema";
import Address from "./customerForm-utils/Address";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

registerLocale("vi", vi);

const UserAdd = () => {
  return (
    <div className="card card-primary">
      <div className="card-header">
        <h3 className="card-title">Tạo người dùng</h3>
      </div>
      <Formik
        initialValues={{
          userId: "",
          userFullName: "",
          username: "",
          userBirthDate: "",
          userGender: "0",
          userEmail: "",
          userPhoneNumber: "",
          userAddresses: [new Address("", "", "", "", "0", false)],
          userRole: "0",
        }}
        validationSchema={UserSchema}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {({ values, setFieldValue, handleChange, isValid, handleSubmit }) => (
          <Form>
            <div className="card-body">
              <div className="row">
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="userId">Mã người dùng</label>
                    <Field
                      type="text"
                      className="form-control"
                      name="userId"
                      placeholder="Nếu không nhập, hệ thống sẽ tự thêm"
                    />
                    <ErrorMessage
                      name="userId"
                      component="small"
                      className="text-red"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="userFullName">Họ và tên người dùng</label>
                    <Field
                      type="text"
                      className="form-control"
                      name="userFullName"
                      placeholder="Nhập tên khách hàng"
                    />
                    <ErrorMessage
                      name="userFullName"
                      component="small"
                      className="text-red"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="username">Tên người dùng</label>
                    <Field
                      type="text"
                      className="form-control"
                      name="username"
                      placeholder="Nhập tên người dùng"
                    />
                    <ErrorMessage
                      name="username"
                      component="small"
                      className="text-red"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="userGender">Giới tính</label>
                    <div role="group" className="form-check">
                      <label className="form-check-label">
                        <Field
                          className="form-check-input"
                          type="radio"
                          name="userGender"
                          value="0"
                        />
                        Nam
                      </label>
                    </div>
                    <div className="form-check">
                      <label className="form-check-label">
                        <Field
                          className="form-check-input"
                          type="radio"
                          name="userGender"
                          value="1"
                        />
                        Nữ
                      </label>
                    </div>
                    <div className="form-check">
                      <label className="form-check-label">
                        <Field
                          className="form-check-input"
                          type="radio"
                          name="userGender"
                          value="2"
                        />
                        Khác
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="userEmail">Email</label>
                    <Field
                      type="email"
                      className="form-control"
                      name="userEmail"
                    />
                    <ErrorMessage
                      name="userEmail"
                      component="small"
                      className="text-red"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="userPhoneNumber">Số điện thoại</label>
                    <Field
                      type="text"
                      className="form-control"
                      name="userPhoneNumber"
                    />
                    <ErrorMessage
                      name="userPhoneNumber"
                      component="small"
                      className="text-red"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="customer-add-form-avatar">
                      Avatar người dùng
                    </label>
                    <input
                      type="file"
                      className="form-control-file"
                      id="customer-add-form-avatar"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="userBirthDate">Ngày sinh</label>
                    <Field
                      as={DatePicker}
                      name="userBirthDate"
                      id="userBirthDate"
                      className="form-control"
                      onChange={(date) =>
                        setFieldValue("userBirthDate", date, true)
                      }
                      value={
                        values.userBirthDate
                          ? values.userBirthDate.toLocaleDateString("vi-VN")
                          : ""
                      }
                      locale={vi}
                      maxDate={new Date()}
                      onKeyDown={(e) => {
                        e.preventDefault();
                      }}
                    />

                    <ErrorMessage
                      name="userBirthDate"
                      component="small"
                      className="text-red"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="userRole">Phân quyền</label>
                    <Field as="select" className="form-control" name="userRole">
                      <option value="0">Admin</option>
                      <option value="1">Quản trị viên</option>
                      <option value="2">Khách hàng</option>
                    </Field>
                    <ErrorMessage
                      name="userRole"
                      component="small"
                      className="text-red"
                    />
                  </div>
                </div>
              </div>
              <FieldArray
                name="userAddresses"
                render={(arrayHelpers) => (
                  <div>
                    <button
                      className="btn btn-primary btn-lg text-right"
                      type="button"
                      onClick={() =>
                        arrayHelpers.push(
                          new Address("", "", "", "", "0", false)
                        )
                      }
                    >
                      Thêm địa chỉ
                    </button>
                    {values.userAddresses.map((address, index) => {
                      // console.log(values.userAddresses);
                      const addressDefaults = values.userAddresses.map(
                        (address) => address.defaultAddress
                      );
                      const disableCheckBoxCondition =
                        addressDefaults.includes(true) &&
                        index !== addressDefaults.indexOf(true);
                      return (
                        <div key={index} className="mt-2">
                          <h5>Địa chỉ nhận hàng {index + 1}</h5>
                          <div className="row">
                            <div className="col-3">
                              <div className="form-group">
                                <label>Họ và tên người nhận:</label>
                                <Field
                                  className="form-control"
                                  name={`userAddresses[${index}].receiverName`}
                                />
                                <ErrorMessage
                                  name={`userAddresses[${index}].receiverName`}
                                  component="small"
                                  className="text-red"
                                />
                              </div>
                            </div>
                            <div className="col-3">
                              <div className="form-group">
                                <label>Địa chỉ:</label>
                                <Field
                                  className="form-control"
                                  name={`userAddresses[${index}].address`}
                                />
                                <ErrorMessage
                                  name={`userAddresses[${index}].address`}
                                  component="small"
                                  className="text-red"
                                />
                              </div>
                            </div>
                            <div className="col-3">
                              <div className="form-group">
                                <label>Số điện thoại:</label>
                                <Field
                                  className="form-control"
                                  name={`userAddresses[${index}].phoneNumber`}
                                />
                                <ErrorMessage
                                  name={`userAddresses[${index}].phoneNumber`}
                                  component="small"
                                  className="text-red"
                                />
                              </div>
                            </div>
                            <div className="col-2 ">
                              <div className="form-check form-group d-flex align-items-center ">
                                <label
                                  className="form-check-label"
                                  style={
                                    {
                                      // display: disableCheckBoxCondition && "none",
                                    }
                                  }
                                >
                                  <Field
                                    name={`userAddresses[${index}].defaultAddress`}
                                    className="form-check-input"
                                    type="checkbox"
                                    style={
                                      {
                                        // display:
                                        //   disableCheckBoxCondition && "none",
                                      }
                                    }
                                    disabled={disableCheckBoxCondition}
                                  />
                                  Đặt làm địa chỉ mặc định
                                </label>
                              </div>
                            </div>
                            <div className="col-1 ">
                              <div className="form-group d-flex align-items-center ">
                                <button
                                  type="button"
                                  className="btn btn-danger"
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  <FontAwesomeIcon icon={solid("trash-can")} />
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div role="group" aria-labelledby="my-radio-group">
                              <label className="mr-4">
                                <Field
                                  type="radio"
                                  name={`userAddresses[${index}].addressCategory`}
                                  value="0"
                                />
                                Nhà riêng
                              </label>
                              <label>
                                <Field
                                  type="radio"
                                  name={`userAddresses[${index}].addressCategory`}
                                  value="1"
                                />
                                Cơ quan
                              </label>
                              <ErrorMessage
                                name={`userAddresses[${index}].addressCategory`}
                                component="small"
                                className="text-red"
                                style={{ display: "block" }}
                              />
                              {/*<div>Picked: {values.picked}</div>*/}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              />
            </div>

            <div className="card-footer text-right">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSubmit}
                // disabled={!isValid}
              >
                Thêm người dùng
              </button>
            </div>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default UserAdd;
