import ContentHeader from "../Content/ContentHeader";
import MainContent from "../Content/MainContent";

const WrapperForContent = () => {
  return (
    <div className="content-wrapper">
      <ContentHeader />
      <MainContent />
    </div>
  );
};
export default WrapperForContent;
