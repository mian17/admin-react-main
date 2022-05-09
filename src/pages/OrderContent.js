import { useState } from "react";
import { confirm } from "react-confirm-box";

import OrderAdd from "../MainComponents/Content/MainContentModules/components/Forms/Order/OrderAdd";
import CardOrdersTable from "../MainComponents/Content/MainContentModules/components/CardTable/CardOrdersTable/CardOrdersTable";
import ContentHeader from "../MainComponents/Content/ContentHeader";

const OrderContent = () => {
  const [ordersToAdd, setOrdersToAdd] = useState([]);

  const addOrderHandler = (order) => {
    // If check whether ID is already in ordersToAdd Array
    if (ordersToAdd.some((el) => el.orderAddId === order.orderAddId)) {
      console.log("Id must be different");
      return;
    }
    setOrdersToAdd((prevState) => [...prevState, order]);
  };

  // TODO: - add confirm box. DONE
  //       - add copy function
  //       - add edit function and then open a modal
  //       - style the confirm box DONE
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
    console.log(JSON.stringify(ordersToAdd[e.target.closest("tr").dataset.id]));
    // navigator.clipboard.writeText(`${e.target.closest("tr")}`);
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

  return (
    <>
      <div className="content-wrapper">
        <ContentHeader name="Đơn hàng" />
        <section className="col-lg-12">
          <OrderAdd onClick={addOrderHandler} />
        </section>
        <section className="col-lg-12">
          <CardOrdersTable
            tableItems={ordersToAdd}
            onClickCopyIcon={copyOrderHandler}
            onClickDeleteIcon={deleteOrderHandler}
          />
        </section>
      </div>
    </>
  );
};
export default OrderContent;
