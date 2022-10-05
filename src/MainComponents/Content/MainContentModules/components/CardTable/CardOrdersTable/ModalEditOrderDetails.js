import Modal from "react-bootstrap/Modal";
import EditOrderForm from "../../Forms/Order/EditOrderForm";

const ModalEditOrderDetails = (props) => {
  return (
    <Modal size="lg" show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          Thông tin chi tiết của đơn hàng <br />
          {props.orderUuid}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <EditOrderForm
          orderUuid={props.orderUuid}
          handleClose={props.handleClose}
        />
      </Modal.Body>
    </Modal>
  );
};
export default ModalEditOrderDetails;
