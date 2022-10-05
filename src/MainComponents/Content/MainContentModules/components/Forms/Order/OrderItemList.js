import { Col, Row } from "react-bootstrap";
import { formatMoney } from "../../../../../../common/utils/helperFunctions";
import React from "react";
import * as PropTypes from "prop-types";

export default function OrderItemList(props) {
  return (
    <Row className="mb-3 justify-content-between shadow p-4 rounded-lg">
      <Col xs={6} md={5} style={{ width: "180px", height: "auto" }}>
        <img
          src={props.orderItem.modelImage}
          alt=""
          className="rounded-lg"
          style={{
            // display: "block",
            // maxWidth: "180px",
            // maxHeight: "95px",
            width: "100%",
            height: "100%",
          }}
        />
      </Col>
      <Col md={6} xs={6}>
        <h6>{props.orderItem.productName}</h6>
        <p>Kiểu loại: {props.orderItem.modelName}</p>
        <p>Số lượng: x{props.orderItem.quantity}</p>
        <p>Đơn giá: {formatMoney(props.orderItem.price)}</p>
      </Col>
    </Row>
  );
}
OrderItemList.propTypes = { orderItem: PropTypes.any };
