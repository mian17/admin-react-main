import { useState } from "react";
import { confirm } from "react-confirm-box";

import OrderAdd from "../MainComponents/Content/MainContentModules/components/Forms/Order/OrderAdd";
import CardOrdersTable from "../MainComponents/Content/MainContentModules/components/CardTable/CardOrdersTable/CardOrdersTable";
import ContentHeader from "../MainComponents/Content/ContentHeader";

import ModalEditOrder from "../MainComponents/Content/MainContentModules/components/Forms/Order/ModalEditOrder";

import { renameKey } from "../utilities/func-utils";

// FOR GETTING DATA FROM DATABASE IN THE FUTURE
export const WAREHOUSES = ["TP. Hồ Chí Minh", "Hà Nội", "Đà Nẵng", "Khánh Hòa"];
export const SELLERS = [
  "Nguyễn Văn A",
  "Nguyễn Thị B",
  "Trần Đình C",
  "Ngô Đỗ Thị D",
];

const OrderContent = () => {
  const [ordersToAdd, setOrdersToAdd] = useState([]);
  const [showModalOrderIndex, setShowModalOrderIndex] = useState(null);
  const [editBtnClicked, setEditBtnClicked] = useState(false);

  const addOrderHandler = (order) => {
    // If check whether ID is already in ordersToAdd Array
    if (ordersToAdd.some((el) => el.orderAddId === order.orderAddId)) {
      console.log("Id must be different");
      return;
    }
    setOrdersToAdd((prevState) => [...prevState, order]);
  };

  const options = {
    labels: {
      confirmable: "Đồng ý",
      cancellable: "Hủy",
    },
    render: (message, onConfirm, onCancel) => {
      return (
        <div className="p-3 confirm-box-custom rounded animate__animated animate__fadeIn">
          <h5 className="py-3">{message}</h5>
          <div className="text-right">
            <button className="btn btn-outline-secondary" onClick={onConfirm}>
              {" "}
              Có
            </button>
            <button className="btn btn-danger ml-2" onClick={onCancel}>
              {" "}
              Không
            </button>
          </div>
        </div>
      );
    },
  };

  const copyOrderHandler = (e) => {
    const selectedRow = ordersToAdd[e.target.closest("tr").dataset.id];
    let readyForClipboard = "";
    for (const data in selectedRow) {
      readyForClipboard += `${selectedRow[data]}\t`;
    }
    navigator.clipboard.writeText(readyForClipboard).then(() => {
      alert("Đã copy nội dung hàng!");
    });
  };
  const deleteOrderHandler = async (e) => {
    const result = await confirm(
      "Bạn có chắc chắn muốn xóa đơn hàng này?",
      options
    );
    if (result) {
      const orderIdToDelete = +e.target.closest("tr").dataset.id;
      setOrdersToAdd((prevState) =>
        prevState.filter((val, i) => i !== orderIdToDelete)
      );
    }
  };
  // let orderIndex;
  const showEditOrderModalHandler = (e) => {
    setEditBtnClicked(true);
    let orderId = e.target.closest("tr").dataset.id;
    setShowModalOrderIndex(orderId);
  };

  const editOrderHandler = (editedOrder) => {
    editedOrder = renameKey(editedOrder, "modalEditOrderId", "orderAddId");
    editedOrder = renameKey(
      editedOrder,
      "modalEditOrderWarehouse",
      "orderAddWarehouse"
    );
    editedOrder = renameKey(
      editedOrder,
      "modalEditOrderDateTime",
      "orderAddDateTime"
    );
    editedOrder = renameKey(
      editedOrder,
      "modalEditOrderSeller",
      "orderAddSeller"
    );
    editedOrder = renameKey(
      editedOrder,
      "modalEditOrderCustomerName",
      "orderAddCustomerName"
    );
    editedOrder = renameKey(
      editedOrder,
      "modalEditOrderStatus",
      "orderAddStatus"
    );
    editedOrder = renameKey(
      editedOrder,
      "modalEditOrderTotalMoney",
      "orderAddTotalMoney"
    );

    setOrdersToAdd((prevState) => {
      prevState[showModalOrderIndex] = editedOrder;
      return [...prevState];
    });
  };

  const deleteSelectedOrdersHandler = async (ordersToDelete) => {
    const result = await confirm(
      "Bạn có chắc chắn muốn xóa những đơn hàng này?",
      options
    );
    if (result) {
      setOrdersToAdd((prevState) => {
        return prevState.filter(
          (order) => !ordersToDelete.includes(order.orderAddId)
        );
      });
    }
  };

  return (
    <>
      <div className="content-wrapper">
        <ContentHeader name="Đơn hàng" />
        <section className="col-lg-12">
          <OrderAdd
            warehouses={WAREHOUSES}
            sellers={SELLERS}
            onClick={addOrderHandler}
          />
        </section>
        <section className="col-lg-12">
          <CardOrdersTable
            tableItems={ordersToAdd}
            onClickCopyIcon={copyOrderHandler}
            onClickDeleteIcon={deleteOrderHandler}
            onClickEditIcon={showEditOrderModalHandler}
            onClickDeleteSelectedOrders={deleteSelectedOrdersHandler}
          />
          {editBtnClicked && (
            <ModalEditOrder
              orderDetails={ordersToAdd[showModalOrderIndex]}
              orderIndex={showModalOrderIndex}
              editOrderFunc={editOrderHandler}
            />
          )}
        </section>
      </div>
    </>
  );
};
export default OrderContent;
