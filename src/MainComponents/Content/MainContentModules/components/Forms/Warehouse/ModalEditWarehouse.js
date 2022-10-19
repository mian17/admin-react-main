import Modal from "react-bootstrap/Modal";
import WarehouseInputs from "./WarehouseInputs";

const ModalEditWarehouse = (props) => {
  // const [showCategorical, setShowCategorical] = useState(false);

  return (
    <Modal size="lg" show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          Sửa thông tin nhà kho có id là {props.editingWarehouseId}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <WarehouseInputs
          editingWarehouseId={props.editingWarehouseId}
          randomId="model"
          closeModel={props.handleClose}
        />
      </Modal.Body>
    </Modal>
  );
};
export default ModalEditWarehouse;
