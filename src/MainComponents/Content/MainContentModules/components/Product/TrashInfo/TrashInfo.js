import { useEffect, useState } from "react";
import apiClient from "../../../../../../api";
import { tokenHeaderConfig } from "../../../../../../common/utils/api-config";
import TrashModel from "./TrashModal";

export default function TrashInfo() {
  const [num, setNum] = useState(0);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const getNumberOfItemsInTrash = async () => {
    try {
      await apiClient.get("/sanctum/csrf-cookie");

      const productResponse = await apiClient.get(
        "api/admin/product-trash",
        tokenHeaderConfig
      );
      const numberOfItemsInTrash = productResponse.data.data.length;
      setNum(numberOfItemsInTrash > 0 ? numberOfItemsInTrash : 0);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getNumberOfItemsInTrash();
  }, []);
  return (
    <>
      <p>
        Số sản phẩm hiện đang ở trong{" "}
        <span
          className="text-red"
          style={{ textDecoration: "underline", cursor: "pointer" }}
          onClick={handleShow}
        >
          thùng rác
        </span>
        : {num}
      </p>
      <TrashModel show={show} onHide={handleClose} />
    </>
  );
}
