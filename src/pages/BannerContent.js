import ContentHeader from "../MainComponents/Content/ContentHeader";
import BannerAdd from "../MainComponents/Content/MainContentModules/components/Forms/Banner/BannerAdd";

const BannerContent = () => {
  return (
    <>
      <div className="content-wrapper">
        <ContentHeader name="Tùy chỉnh banner" />

        <section className="col-lg-12">
          <BannerAdd />
        </section>
        <section className="col-lg-12">{/*<CardCategoryTable />*/}</section>
      </div>
    </>
  );
};

export default BannerContent;
