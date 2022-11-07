import ContentHeader from "../MainComponents/Content/ContentHeader";
import CategoryAdd from "../MainComponents/Content/MainContentModules/components/Forms/Category/CategoryAdd";
import CardCategoryTable from "../MainComponents/Content/MainContentModules/components/CardTable/CardCategoryTable/CardCategoryTable";

const CategoryContent = () => {
  return (
    <div className="content-wrapper">
      <ContentHeader name="Danh mục" />

      <section className="col-lg-12">
        <CategoryAdd />
      </section>
      <section className="col-lg-12">
        <CardCategoryTable />
      </section>
    </div>
  );
};
export default CategoryContent;
