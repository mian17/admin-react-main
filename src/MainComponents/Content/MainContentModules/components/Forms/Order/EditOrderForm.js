import { OrderSchema } from "../../../../../../common/utils/validationSchema";
import { Form, Formik } from "formik";
import { Col, Row } from "react-bootstrap";
import FormField from "../../../../../../common/components/FormField";
import React, { useCallback, useEffect, useState } from "react";
import Order from "./editOrderForm-utils/Order";
import apiClient from "../../../../../../api";
import OrderItem from "./editOrderForm-utils/OrderItem";
import { backendServerPath } from "../../../../../../utilities/backendServerPath";

import OrderItemList from "./OrderItemList";
import Button from "react-bootstrap/Button";
import LoadingSpinner from "../../../../../../common/components/LoadingSpinner";
import OrderToServer from "./editOrderForm-utils/OrderToServer";
import { useNavigate } from "react-router-dom";

const EditOrderForm = (props) => {
  const navigate = useNavigate();
  const [initialFormValue, setInitialFormValue] = useState(
    new Order("", "", "", "")
  );
  const [paymentMethod, setPaymentMethod] = useState("");
  const [orderItems, setOrderItems] = useState([]);
  const fetchOrderInfo = useCallback(async () => {
    try {
      const userToken = JSON.parse(localStorage.getItem("personalAccessToken"));

      await apiClient.get("/sanctum/csrf-cookie");

      const response = await apiClient.get(
        `api/admin/order/${props.orderUuid}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      const transformedOrderItems = response.data.map((orderItem) => {
        return new OrderItem(
          orderItem.product_name,
          orderItem.model_name,
          orderItem.quantity,
          orderItem.price,
          backendServerPath + orderItem.model_image_url
        );
      });
      setOrderItems(transformedOrderItems);

      const receiverInfo = response.data[0];

      setInitialFormValue(
        new Order(
          receiverInfo.receiver_name,
          receiverInfo.receiver_address,
          receiverInfo.receiver_phone_number,
          receiverInfo.receiver_email
        )
      );
      setPaymentMethod(receiverInfo.payment_method);
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  }, [props.orderUuid]);

  useEffect(() => {
    fetchOrderInfo();
  }, [fetchOrderInfo]);

  return (
    <Formik
      initialValues={initialFormValue}
      validationSchema={OrderSchema}
      onSubmit={async (values) => {
        const {
          receiverName,
          receiverAddress,
          receiverPhoneNumber,
          receiverEmail,
        } = values;

        try {
          const userToken = JSON.parse(
            localStorage.getItem("personalAccessToken")
          );

          await apiClient.get("/sanctum/csrf-cookie");
          const data = new OrderToServer(
            receiverName,
            receiverAddress,
            receiverPhoneNumber,
            receiverEmail
          );

          const response = await apiClient.patch(
            `api/admin/order/${props.orderUuid}`,
            data,
            {
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${userToken}`,
              },
            }
          );
          alert(response.data.message);
          navigate(0);
        } catch (error) {
          alert(error.response.data.message);
        }
      }}
      enableReinitialize
    >
      {({ handleSubmit, setFieldValue, values, isValid, isSubmitting }) => (
        <Form className="card-body" onSubmit={handleSubmit}>
          <h4>Thông tin người nhận</h4>
          <Row className="mb-3">
            <FormField
              as={Col}
              controlId={"validationFormik01" + props.randomId}
              label="Họ và tên"
              type="text"
              name="receiverName"
            />
          </Row>
          <Row className="mb-3">
            <FormField
              as={Col}
              controlId={"validationFormik02" + props.randomId}
              label="Địa chỉ"
              type="text"
              name="receiverAddress"
            />
          </Row>
          <Row className="mb-3">
            <FormField
              as={Col}
              controlId={"validationFormik03" + props.randomId}
              label="Số điện thoại"
              type="text"
              name="receiverPhoneNumber"
            />
          </Row>
          <Row className="mb-3">
            <FormField
              as={Col}
              controlId={"validationFormik02" + props.randomId}
              label="Email"
              type="text"
              name="receiverEmail"
            />
          </Row>
          <Row className="mb-3 flex-row-reverse">
            <Button
              style={{ display: "inline-block" }}
              variant="danger"
              type="submit"
              disabled={!isValid || isSubmitting}
            >
              Sửa thông tin
              {isSubmitting && <LoadingSpinner />}
            </Button>
            <Button
              className="mr-2"
              variant="secondary"
              onClick={props.handleClose}
            >
              Đóng
            </Button>
          </Row>
          <Row>
            <h5>Phương thức thanh toán</h5>
            <br />
          </Row>
          <Row className="mb-3">{paymentMethod}</Row>
          <Row className="mb-3">
            <h4>Các sản phẩm khách đã đặt</h4>
          </Row>
          {orderItems.map((orderItem, index) => {
            return <OrderItemList key={index} orderItem={orderItem} />;
          })}
        </Form>
      )}
    </Formik>
  );
};
export default EditOrderForm;
