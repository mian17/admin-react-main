import SearchFormItemSidebar from "./componentsItemSidebar/SearchFormItemSidebar";
import UserPanelItemSidebar from "./componentsItemSidebar/UserPanelItemSidebar";
import NavigationModule from "./navigationModule/NavigationModule";

const ItemsSidebarModule = () => {
  return (
    <div className="sidebar">
      <UserPanelItemSidebar />
      <SearchFormItemSidebar />
      <NavigationModule />
    </div>
  );
};
export default ItemsSidebarModule;
