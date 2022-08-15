import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { CloseButton } from "react-bootstrap";

const ModalEditProduct = (props) => {
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          Sửa thông tin sản phẩm {props.editingProductId}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Bạn đang sửa đổi thông tin cho sản phẩm có id là{" "}
        {props.editingProductId}!
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Đóng
        </Button>
        <Button variant="primary" onClick={props.handleClose}>
          Lưu thay đổi
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ModalEditProduct;
