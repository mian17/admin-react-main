import LogoSidebarModule from "./MainSidebarModules/LogoSidebarModule";
import ItemsSidebarModule from "./MainSidebarModules/ItemsSidebarModule";
const MainSidebar = () => {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <LogoSidebarModule />
      <ItemsSidebarModule />
    </aside>
  );
};

export default MainSidebar;
