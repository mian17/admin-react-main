import ContentHeader from "../MainComponents/Content/ContentHeader";
import ProductAdd from "../MainComponents/Content/MainContentModules/components/Forms/Product/ProductAdd";
import CardProductsTable from "../MainComponents/Content/MainContentModules/components/CardTable/CardProductsTable/CardProductsTable";

const ProductContent = () => {
  return (
    <>
      <div className="content-wrapper">
        <ContentHeader name="Sản phẩm" />
        <section className="col-lg-12">
          <ProductAdd />
        </section>
        <section className="col-lg-12">
          <CardProductsTable />
        </section>
      </div>
    </>
  );
};
export default ProductContent;
