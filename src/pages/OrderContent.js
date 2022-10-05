// import { confirm } from "react-confirm-box";
import CardOrdersTable
    from "../MainComponents/Content/MainContentModules/components/CardTable/CardOrdersTable/CardOrdersTable";
import ContentHeader from "../MainComponents/Content/ContentHeader";

// FOR GETTING DATA FROM DATABASE IN THE FUTURE

const OrderContent = () => {

  return (
    <>
      <div className="content-wrapper">
        <ContentHeader name="Đơn hàng" />
        <section className="col-lg-12">
          <CardOrdersTable />
        </section>
      </div>
    </>
  );
};
export default OrderContent;
