import ContentHeader from "../MainComponents/Content/ContentHeader";
import CustomerAdd from "../MainComponents/Content/MainContentModules/components/Forms/Customer/CustomerAdd";
import CardCustomersTable from "../MainComponents/Content/MainContentModules/components/CardTable/CardCustomersTable/CardCustomersTable";

const CustomerContent = () => {
  return (
    <>
      <div className="content-wrapper">
        <ContentHeader name="Khách hàng" />
        <section className="col-lg-12">
          <CustomerAdd />
        </section>
        <section className="col-lg-12">
          <CardCustomersTable />
        </section>
      </div>
    </>
  );
};
export default CustomerContent;
