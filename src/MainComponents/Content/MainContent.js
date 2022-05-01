import InfoDetailsMainContent from "./MainContentModules/InfoDetailsMainContent";
import SortableContent from "./MainContentModules/SortableContent";
const MainContent = () => {
  return (
    <section className="content">
      <div className="container-fluid">
        <InfoDetailsMainContent />
        <SortableContent />
      </div>
    </section>
  );
};
export default MainContent;
