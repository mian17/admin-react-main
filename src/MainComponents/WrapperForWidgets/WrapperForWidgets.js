import Preloader from "../Preloader/Preloader";
import Navbar from "../Navbar/Navbar";
import MainSidebar from "../MainSidebar/MainSidebar";
import WrapperForContent from "../WrapperForContent/WrapperForContent";
import Footer from "../Footer/Footer";
import ControlSidebar from "../ControlSidebar/ControlSidebar";

const Wrapper = () => {
  return (
    <div className="wrapper">
      <Preloader />
      <Navbar />
      <MainSidebar />
      <WrapperForContent />

      <Footer />
      <ControlSidebar />
    </div>
  );
};
export default Wrapper;
