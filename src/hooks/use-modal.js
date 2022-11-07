import { useState } from "react";

const useModal = () => {
  // Modal State
  const [show, setShow] = useState(false);
  // Modal Handlers
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return { show, setShow, handleShow, handleClose };
};
export default useModal;
