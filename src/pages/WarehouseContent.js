import ContentHeader from "../MainComponents/Content/ContentHeader";
import WarehouseAdd from "../MainComponents/Content/MainContentModules/components/Forms/Warehouse/WarehouseAdd";
import CardWarehouseTable from "../MainComponents/Content/MainContentModules/components/CardTable/CardWarehouseTable/CardWarehouseTable";

const WarehouseContent = () => {
  return (
    <>
      <div className="content-wrapper">
        <ContentHeader name="Nhà kho" />
        <section className="col-lg-12">
          <WarehouseAdd />
        </section>
        <section className="col-lg-12">
          <CardWarehouseTable />
        </section>
      </div>
    </>
  );
};
export default WarehouseContent;
