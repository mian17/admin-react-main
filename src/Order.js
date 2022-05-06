import { useState } from "react";

import OrderAdd from "./MainComponents/Content/MainContentModules/components/Forms/Order/OrderAdd";
import CardOrdersTable from "./MainComponents/Content/MainContentModules/components/CardTable/CardOrdersTable/CardOrdersTable";

const Order = () => {
  const [ordersToAdd, setOrdersToAdd] = useState([]);

  const addOrderHandler = (order) => {
    // If check whether ID is already in ordersToAdd Array
    if (ordersToAdd.some((el) => el.orderAddId === order.orderAddId)) {
      console.log("Id must be different");
      return;
    }
    setOrdersToAdd((prevState) => [...prevState, order]);
  };

  // TODO add confirm box.
  const deleteOrderHandler = (e) => {
    const orderIdToDelete = +e.target.closest("tr").dataset.id;
    console.log(orderIdToDelete);
    setOrdersToAdd((prevState) =>
      prevState.filter((val, i) => i !== orderIdToDelete)
    );
    console.log(ordersToAdd);
  };

  console.log(ordersToAdd);
  return (
    <>
      <section className="col-lg-12">
        <OrderAdd onClick={addOrderHandler} />
      </section>
      <section className="col-lg-12">
        <CardOrdersTable
          tableItems={ordersToAdd}
          onClickDeleteIcon={deleteOrderHandler}
        />
      </section>
    </>
  );
};
export default Order;
