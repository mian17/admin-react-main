import ContentHeader from "../MainComponents/Content/ContentHeader";
import ProductAdd from "../MainComponents/Content/MainContentModules/components/Forms/Product/ProductAdd";
import CardProductsTable from "../MainComponents/Content/MainContentModules/components/CardTable/CardProductsTable/CardProductsTable";
import TrashInfo from "../MainComponents/Content/MainContentModules/components/Product/TrashInfo/TrashInfo";
import ImageModelAdd from "../MainComponents/Content/MainContentModules/components/Forms/Product/ImageModelAdd";

const ProductContent = () => {
  return (
    <>
      <div className="content-wrapper">
        <ContentHeader name="Sản phẩm" />

        <section className="col-lg-12">
          <TrashInfo />
          <ProductAdd />
          <ImageModelAdd />
        </section>
        <section className="col-lg-12">
          <CardProductsTable />
        </section>
      </div>
    </>
  );
};
export default ProductContent;
