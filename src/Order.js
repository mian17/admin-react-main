import { useState } from "react";

import OrderAdd from "./MainComponents/Content/MainContentModules/components/Forms/Order/OrderAdd";
import CardOrdersTable from "./MainComponents/Content/MainContentModules/components/CardTable/CardOrdersTable/CardOrdersTable";

const Order = () => {
  const [ordersToAdd, setOrdersToAdd] = useState([]);

  const addOrderHandler = (order) => {
    setOrdersToAdd((prevState) => [...prevState, order]);
  };

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
