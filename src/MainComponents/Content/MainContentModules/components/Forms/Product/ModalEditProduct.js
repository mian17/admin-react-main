import Modal from "react-bootstrap/Modal";
import ProductInputs from "./ProductInputs";

const ModalEditProduct = (props) => {
  // const [showCategorical, setShowCategorical] = useState(false);

  return (
    <Modal size="lg" show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          Sửa thông tin sản phẩm {props.editingProductId}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ProductInputs
          productId={props.editingProductId}
          randomId="model"
          closeModel={props.handleClose}
        />
      </Modal.Body>
    </Modal>
  );
};
export default ModalEditProduct;
