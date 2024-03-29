import Navbar from "../MainComponents/Navbar/Navbar";
import MainSidebar from "../MainComponents/MainSidebar/MainSidebar";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import LogIn from "../MainComponents/Content/MainContentModules/components/Forms/Account/LogIn/LogIn";
import DashboardContent from "../pages/DashboardContent";
import OrderContent from "../pages/OrderContent";
import ProductContent from "../pages/ProductContent";
import { UserContent } from "../pages/UserContent";
import { useContext } from "react";
import AuthContext from "../store/auth-context";
import CategoryContent from "../pages/CategoryContent";
import WarehouseContent from "../pages/WarehouseContent";
import MerchantContent from "../pages/MerchantContent";
import ChatContent from "../pages/ChatContent";
import MessageAlert from "../common/components/MessageAlert";
import MessageContext from "../store/message-context";

const Content = () => {
  const { loggedIn } = useContext(AuthContext);
  const { hasMessage, heading, content, variant } = useContext(MessageContext);

  return (
    <div className="wrapper">
      <div className="container-fluid">
        <Routes>
          <Route path="/login" element={<LogIn />} />

          <Route
            path="/"
            element={loggedIn ? <Outlet /> : <Navigate to="/login" />}
          >
            <Route
              path="/"
              index
              element={
                <>
                  <Navbar />
                  <MainSidebar />
                  <DashboardContent />
                </>
              }
            />

            <Route
              path="/order"
              element={
                <>
                  <Navbar />
                  <MainSidebar />
                  <OrderContent />
                </>
              }
            />
            <Route
              path="/product"
              element={
                <>
                  <Navbar />
                  <MainSidebar />
                  <ProductContent />
                </>
              }
            />
            <Route
              path="/category"
              element={
                <>
                  <Navbar />
                  <MainSidebar />
                  <CategoryContent />
                </>
              }
            />

            <Route
              path="/user"
              element={
                <>
                  <Navbar />
                  <MainSidebar />
                  <UserContent />
                </>
              }
            />

            <Route
              path="/warehouse"
              element={
                <>
                  <Navbar />
                  <MainSidebar />
                  <WarehouseContent />
                </>
              }
            />

            <Route
              path="/merchant"
              element={
                <>
                  <Navbar />
                  <MainSidebar />
                  <MerchantContent />
                </>
              }
            />

            <Route
              path="/chat"
              element={
                <>
                  <Navbar />
                  <MainSidebar />
                  {/*<MerchantContent />*/}
                  <ChatContent />
                </>
              }
            />

            {/*<Route*/}
            {/*  path="/homepage-config/banner"*/}
            {/*  element={*/}
            {/*    <>*/}
            {/*      <Navbar />*/}
            {/*      <MainSidebar />*/}
            {/*      /!*<MerchantContent />*!/*/}
            {/*      <BannerContent />*/}
            {/*    </>*/}
            {/*  }*/}
            {/*/>*/}
          </Route>
        </Routes>
        {hasMessage && (
          <MessageAlert heading={heading} content={content} variant={variant} />
        )}
      </div>
    </div>
  );
};
export default Content;
