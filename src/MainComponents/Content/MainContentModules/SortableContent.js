// Form
import ProductAdd from "./components/Forms/Product/ProductAdd";

import CustomerAdd from "./components/Forms/Customer/CustomerAdd";
import StockAdd from "./components/Forms/Stock/StockAdd";

// Table
import CardProductsTable from "./components/CardTable/CardProductsTable/CardProductsTable";

import CardCustomersTable from "./components/CardTable/CardCustomersTable/CardCustomersTable";
import CardStockTable from "./components/CardTable/CardStockTable/CardStockTable";

import CardDashboardTable from "./components/CardDashboardTable/TableDashboardContent";
import CardSales from "./components/CardSales/CardSales";
import CardTodo from "./components/CardTodo/CardTodo";

// Context
import Order from "../../../Order";

// import LeftSortableContent from "./SortableContentModules/LeftSortableContent";
// import RightSortableContent from "./SortableContentModules/RightSortableContent";

const dashboardTableData = [
  {
    id: 0,
    title: "Hoạt động",
    tableDataRow0: ["Tên bán hàng", 0],
    tableDataRow1: ["Số đơn hàng", 0],
    tableDataRow2: ["Số sản phẩm", 0],
    tableDataRow3: ["Số khách hàng trả", 0],
  },
  {
    id: 1,
    title: "Thông tin kho",
    tableDataRow0: ["Tồn kho", 0],
    tableDataRow1: ["Hết hàng", 0],
    tableDataRow2: ["Sắp hết hàng", 0],
    tableDataRow3: ["Vượt định mức", 0],
  },
  {
    id: 2,
    title: "Thông tin sản phẩm",
    tableDataRow0: ["Sản phẩm / Nhà sản xuất", 0],
    tableDataRow1: ["Chưa làm giá bán", 0],
    tableDataRow2: ["Chưa nhập giá mua", 0],
    tableDataRow3: ["Hàng chưa phân loại", 0],
  },
];
const SortableContent = () => {
  return (
    <div className="row">
      {/* <LeftSortableContent /> */}
      {/* <RightSortableContent /> */}

      {dashboardTableData.map((data) => (
        <section key={data.id} className="col-lg-4">
          <CardDashboardTable
            title={data.title}
            tableDataRow0={data.tableDataRow0}
            tableDataRow1={data.tableDataRow1}
            tableDataRow2={data.tableDataRow2}
            tableDataRow3={data.tableDataRow3}
          />
        </section>
      ))}

      <section className="col-lg-6">
        <CardSales />
      </section>
      <section className="col-lg-6">
        <CardTodo />
      </section>

      <section className="col-lg-12">
        <ProductAdd />
      </section>
      <section className="col-lg-12">
        <CardProductsTable />
      </section>

      <Order />

      <section className="col-lg-12">
        <CustomerAdd />
      </section>
      <section className="col-lg-12">
        <CardCustomersTable />
      </section>

      <section className="col-lg-12">
        <StockAdd />
      </section>
      <section className="col-lg-12">
        <CardStockTable />
      </section>
    </div>
  );
};

export default SortableContent;
