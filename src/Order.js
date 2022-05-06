import { useState } from "react";

import OrderAdd from "./MainComponents/Content/MainContentModules/components/Forms/Order/OrderAdd";
import CardOrdersTable from "./MainComponents/Content/MainContentModules/components/CardTable/CardOrdersTable/CardOrdersTable";

const Order = () => {
  const [ordersToAdd, setOrdersToAdd] = useState([]);

  const addOrderHandler = (order) => {
    // If check if Id is already in ordersToAdd Array
    if (ordersToAdd.some((el) => el.orderAddId === order.orderAddId)) {
      console.log("Id must be different");
      return;
    }
    setOrdersToAdd((prevState) => [...prevState, order]);
  };
  console.log(ordersToAdd);
  return (
    <>
      <section className="col-lg-12">
        <OrderAdd onClick={addOrderHandler} />
      </section>
      <section className="col-lg-12">
        <CardOrdersTable tableItems={ordersToAdd} />
      </section>
    </>
  );
};
export default Order;
