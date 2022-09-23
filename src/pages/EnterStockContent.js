import ContentHeader from "../MainComponents/Content/ContentHeader";
import EnterStockAdd from "../MainComponents/Content/MainContentModules/components/Forms/Stock/EnterStockAdd";
import CardEnterStockTable from "../MainComponents/Content/MainContentModules/components/CardTable/CardStockTable/CardEnterStockTable";

const EnterStockContent = () => {
  return (
    <>
      <div className="content-wrapper">
        <ContentHeader name="Nhập kho" />
        <section className="col-lg-12">
          <EnterStockAdd />
        </section>
        <section className="col-lg-12">
          <CardEnterStockTable />
        </section>
      </div>
    </>
  );
};
export default EnterStockContent;
