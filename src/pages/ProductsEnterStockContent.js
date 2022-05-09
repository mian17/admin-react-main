import ContentHeader from "../MainComponents/Content/ContentHeader";
import StockAdd from "../MainComponents/Content/MainContentModules/components/Forms/Stock/StockAdd";
import CardStockTable from "../MainComponents/Content/MainContentModules/components/CardTable/CardStockTable/CardStockTable";

const ProductsEnterStockContent = () => {
  return (
    <>
      <div className="content-wrapper">
        <ContentHeader name="Nhập kho" />
        <section className="col-lg-12">
          <StockAdd />
        </section>
        <section className="col-lg-12">
          <CardStockTable />
        </section>
      </div>
    </>
  );
};
export default ProductsEnterStockContent;
