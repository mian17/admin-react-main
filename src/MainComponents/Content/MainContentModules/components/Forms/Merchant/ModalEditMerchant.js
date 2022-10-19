import Modal from "react-bootstrap/Modal";
import MerchantInputs from "./MerchantInputs";

const ModalEditMerchant = (props) => {
  // const [showCategorical, setShowCategorical] = useState(false);

  return (
    <Modal size="lg" show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          Sửa thông tin nhà bán có id là {props.editingMerchantId}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <MerchantInputs
          editingMerchantId={props.editingMerchantId}
          randomId="model"
          closeModel={props.handleClose}
        />
      </Modal.Body>
    </Modal>
  );
};
export default ModalEditMerchant;
