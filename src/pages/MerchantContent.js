import ContentHeader from "../MainComponents/Content/ContentHeader";
import MerchantAdd from "../MainComponents/Content/MainContentModules/components/Forms/Merchant/MerchantAdd";
import CardMerchantTable from "../MainComponents/Content/MainContentModules/components/CardTable/CardMerchantTable/CardMerchantTable";

const MerchantContent = () => {
  return (
    <>
      <div className="content-wrapper">
        <ContentHeader name="Nhà bán" />

        <section className="col-lg-12">
          <MerchantAdd />
        </section>
        <section className="col-lg-12">
          <CardMerchantTable />
        </section>
      </div>
    </>
  );
};
export default MerchantContent;
