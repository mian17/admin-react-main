import Modal from "react-bootstrap/Modal";
import CategoryInputs from "./CategoryInputs";

const ModalEditCategory = (props) => {
  return (
    <Modal
      size="lg"
      className="align-items-center"
      show={props.show}
      onHide={props.handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Sửa thông tin cho danh mục có id là {props.editingCategoryId}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CategoryInputs
          categoryId={props.editingCategoryId}
          randomId="edit-category"
        />
      </Modal.Body>
    </Modal>
  );
};
export default ModalEditCategory;
