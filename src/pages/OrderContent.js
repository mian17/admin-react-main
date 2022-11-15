// import { confirm } from "react-confirm-box";
import CardOrdersTable
    from "../MainComponents/Content/MainContentModules/components/CardTable/CardOrdersTable/CardOrdersTable";
import ContentHeader from "../MainComponents/Content/ContentHeader";

// FOR GETTING DATA FROM DATABASE IN THE FUTURE

const OrderContent = () => {
  return (
    <>
      <div className="content-wrapper">
        <ContentHeader name="Đơn hàng" />
        <section className="col-lg-12">
          <p className="text-red">
            Lưu ý: Khi đơn hàng <em>đã được giao</em> và <em>đã thanh toán</em>,
            khi quá 7 ngày kể từ ngày cập nhật trạng thái đơn hàng cuối cùng, hệ
            thống sẽ xem như đơn hàng này không còn thay đổi gì nữa và bạn sẽ{" "}
            <strong>
              không được thay đổi trạng thái và thông tin của đơn hàng đó
            </strong>
            .
          </p>
          <CardOrdersTable />
        </section>
      </div>
    </>
  );
};
export default OrderContent;
