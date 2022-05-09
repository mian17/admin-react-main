import { Route, Routes } from "react-router-dom";

import Preloader from "./MainComponents/Preloader/Preloader";
import Navbar from "./MainComponents/Navbar/Navbar";
import MainSidebar from "./MainComponents/MainSidebar/MainSidebar";

import Footer from "./MainComponents/Footer/Footer";

import DashboardContent from "./pages/DashboardContent";
import OrderContent from "./pages/OrderContent";
import ProductContent from "./pages/ProductContent";
import CustomerContent from "./pages/CustomerContent";
import ProductsEnterStockContent from "./pages/ProductsEnterStockContent";

function App() {
  return (
    <div className="wrapper">
      <Preloader />
      <Navbar />
      <MainSidebar />
      <Routes>
        <Route path="/" element={<DashboardContent />} />
        <Route path="/order" element={<OrderContent />} />
        <Route path="/product" element={<ProductContent />} />
        <Route path="/customer" element={<CustomerContent />} />
        <Route path="/stock" element={<ProductsEnterStockContent />} />
      </Routes>

      {/*<StillInWarehouseContent />*/}
      {/*<SalesNumberContent />*/}
      {/*<SpendMoneyContent />*/}
      {/*<RevenueContent />*/}
      {/*<SettingContent />*/}
      <Footer />
    </div>
  );
}

export default App;
