import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useCallback, useEffect, useRef, useState } from "react";
import apiClient from "../../../../../../api";
import { tokenHeaderConfig } from "../../../../../../common/utils/api-config";
import User from "./customerForm-utils/User";
import { Col, Row, Spinner } from "react-bootstrap";
import {
  genders,
  orderStatuses,
} from "../../../../../../common/utils/helperVars";
import { formatMoney } from "../../../../../../common/utils/helperFunctions";

const ModalUserDetails = (props) => {
  const [user, setUser] = useState(new User("", "", "", "", "", "", ""));
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCurrentUser = useCallback(async () => {
    setIsLoading(true);
    try {
      await apiClient.get("/sanctum/csrf-cookie");

      const response = await apiClient.get(
        `api/admin/user/${props.userUuid}`,
        tokenHeaderConfig
      );
      const {
        username,
        email,
        phone_number,
        name,
        birth_date,
        gender,
        address,
        orders,
      } = response.data;

      setUser(
        new User(
          username,
          email,
          phone_number,
          name,
          birth_date,
          gender,
          address
        )
      );
      nameRef.current.value = user.name;
      usernameRef.current.value = user.username;
      emailRef.current.value = user.email;
      genderRef.current.value = genders[user.gender];
      phoneNumberRef.current.value = user.phoneNumber;
      birthDateRef.current.value = new Date(user.birthDate).toLocaleDateString(
        "vi-VN"
      );

      setOrders(orders);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }, [
    props.userUuid,
    user.birthDate,
    user.email,
    user.gender,
    user.name,
    user.phoneNumber,
    user.username,
  ]);

  useEffect(() => {
    if (props.userUuid) {
      setOrders([]);
      // nameRef.current.value = "";
      // usernameRef.current.value = "";
      // emailRef.current.value = "";
      // genderRef.current.value = "";
      // phoneNumberRef.current.value = "";
      // birthDateRef.current.value = "";
      fetchCurrentUser();
    }
  }, [fetchCurrentUser, props.userUuid]);
  console.log(user);

  const nameRef = useRef(user.name);
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const genderRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const birthDateRef = useRef(null);
  return (
    <Modal size="lg" show={props.show} onHide={props.handleClose}>
      <Modal.Header>
        <Modal.Title>
          Thông tin chi tiết của người dùng {props.userUuid}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="card-body">
            <Row>
              <Col>
                <div className="form-group">
                  <label htmlFor="userFullName">Họ và tên người dùng</label>
                  <input
                    type="text"
                    className="form-control"
                    id="userFullName"
                    readOnly
                    ref={nameRef}
                    defaultValue={user.name}
                  />
                </div>
              </Col>
              <Col>
                <div className="form-group">
                  <label htmlFor="username">Tên người dùng</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    readOnly
                    ref={usernameRef}
                    defaultValue={user.username}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <label htmlFor="userEmail">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="userEmail"
                  ref={emailRef}
                  readOnly
                  defaultValue={user.email}
                />
              </Col>
              <Col>
                <div className="form-group">
                  <label htmlFor="userGender">Giới tính</label>
                  <input
                    type="text"
                    className="form-control"
                    id="userGender"
                    ref={genderRef}
                    defaultValue={genders[user.gender]}
                    readOnly
                  />
                </div>
              </Col>
            </Row>

            <Row>
              <Col>
                <div className="form-group">
                  <label htmlFor="userPhoneNumber">Số điện thoại</label>
                  <input
                    type="text"
                    className="form-control"
                    id="userPhoneNumber"
                    ref={phoneNumberRef}
                    defaultValue={user.phoneNumber}
                    readOnly
                  />
                </div>
              </Col>
              <Col>
                <div className="form-group">
                  <label htmlFor="userBirthDate">Ngày sinh</label>
                  <input
                    name="userBirthDate"
                    id="userBirthDate"
                    className="form-control"
                    ref={birthDateRef}
                    defaultValue={new Date(user.birthDate).toLocaleDateString(
                      "vi-VN"
                    )}
                    readOnly
                  />
                </div>
              </Col>
            </Row>
            <Row className="mb-3">
              <h5>Số đơn hàng khách đã đặt: {orders.length}</h5>
            </Row>
            {isLoading && (
              <Row className="justify-content-center">
                <Spinner animation="border" role="status" />
              </Row>
            )}
            {!isLoading && orders.length === 0 && (
              <p>Người dùng này chưa đặt đơn hàng nào</p>
            )}
            {orders.length > 0 &&
              orders.map((order, index) => {
                return (
                  <div key={index} className="shadow p-4 rounded-lg">
                    <Row>
                      <Col>
                        <h6
                          style={{ display: "block", listStyleType: "circle" }}
                        >
                          Mã đơn hàng: {order.uuid}
                        </h6>
                      </Col>
                    </Row>
                    <p>Trạng thái: {orderStatuses[order.status_id - 1]}</p>
                    <p>Tổng tiền: {formatMoney(order.total)}</p>
                  </div>
                );
              })}
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="button"
          className="btn btn-secondary"
          onClick={props.handleClose}
        >
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ModalUserDetails;
