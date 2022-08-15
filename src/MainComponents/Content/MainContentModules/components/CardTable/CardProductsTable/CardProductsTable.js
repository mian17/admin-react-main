import { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useTable, useRowSelect } from "react-table";
import {
  useExpanded,
  useFilters,
  useGroupBy,
  usePagination,
  useSortBy,
  useGlobalFilter,
} from "react-table";
import GlobalFilter from "../../../../../../common/components/GlobalFilter";
import IndeterminateCheckbox from "../../../../../../common/components/IndeterminateCheckbox";

import { productsInTableHeaders } from "./cardProductsTable-test-data/products-in-table-headers";
import { productsInTableRows } from "./cardProductsTable-test-data/productsInTable-rows";
import ModalEditOrder from "../../Forms/Order/ModalEditOrder";
import { confirm } from "react-confirm-box";
import {
  copyInfoHandler,
  editInfoHandler,
} from "../../../../../../common/utils/helperFunctions";
import { confirmBoxOptions } from "../../../../../../common/utils/options";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ModalEditProduct from "../../Forms/Product/ModalEditProduct";
import { CSVLink } from "react-csv";
const CardProductsTable = () => {
  // Modal State
  const [show, setShow] = useState(false);
  // Modal Handlers
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // Editing product id state
  const [editingProductId, setEditingProductId] = useState(null);

  // React Table Handler
  const [data, setData] = useState(useMemo(() => productsInTableRows, []));

  const columns = useMemo(
    () => [
      {
        Header: "Mã sản phẩm",
        accessor: "id", // accessor is the "key" in the data
      },
      {
        Header: "Tên sản phẩm",
        accessor: "name",
      },
      {
        Header: "Số lượng",
        accessor: "quantity",
      },
      {
        Header: "Đơn giá",
        accessor: "price",
      },

      {
        Header: "Danh mục",
        accessor: "category",
      },
      {
        Header: "Trạng thái",
        accessor: "status",
      },
      {
        Header: "Nhà bán",
        accessor: "merchant",
      },
      {
        Header: "Chức năng",
        accessor: "functions",

        Cell: ({ cell, row }) => {
          const rowValues = cell.row.values;
          const rowItemId = cell.row.values.id; // id from ProductInCart.js constructor
          // const rowItemId = row.index; // id from ProductInCart.js constructor
          return (
            <div>
              <button
                className="btn btn-success"
                onClick={() => copyInfoHandler(rowValues)}
              >
                <FontAwesomeIcon icon={solid("copy")} />
              </button>
              <button
                className="btn btn-warning"
                onClick={() => editInfoHandler(rowItemId)}
              >
                <FontAwesomeIcon icon={solid("pen-to-square")} />
              </button>
              <button
                className="btn btn-danger"
                onClick={() => deleteInfoHandler(rowItemId)}
              >
                <FontAwesomeIcon icon={solid("trash-can")} />
              </button>
            </div>
          );
        },
      },
    ],
    []
  );
  function copyInfoHandler(valueObj) {
    let readyForClipboard = "";

    for (const property in valueObj) {
      if (property === "functions") continue;
      readyForClipboard += `${valueObj[property]}\t`;
    }
    navigator.clipboard.writeText(readyForClipboard).then(() => {
      alert("Đã copy nội dung hàng của bảng!");
    });
  }
  function editInfoHandler(productId) {
    setEditingProductId(productId);
    setShow(true);
  }
  async function deleteInfoHandler(productIdToDelete) {
    const result = await confirm(
      "Bạn có chắc chắn muốn xóa sản phẩm này?",
      confirmBoxOptions
    );
    if (result) {
      setData((prevState) =>
        prevState.filter((product) => product.id !== productIdToDelete)
      );
    }
  }
  const deleteBulkInfoHandler = async () => {
    // a variable from react table library
    const bulkId = selectedFlatRows.map((row) => row.original.id);
    console.log(bulkId);

    const result = await confirm(
      "Bạn có chắc chắn muốn xóa các sản phẩm này?",
      confirmBoxOptions
    );
    if (result) {
      setData((prevState) => {
        return prevState.filter((product) => !bulkId.includes(product.id));
      });
    }
  };
  const tableInstance = useTable(
    { columns, data },
    useGlobalFilter,
    useGroupBy,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            id: "selection",
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            ),
            Cell: ({ row }) => (
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            ),
          },
          ...columns,
        ];
      });
    }
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageCount,
    setPageSize,

    prepareRow,
    state,
    setGlobalFilter,
    selectedFlatRows,
  } = tableInstance;

  const { globalFilter, pageIndex, pageSize } = state;
  const headers = [
    { label: "Mã đơn hàng", key: "id" },
    { label: "Tên sản phẩm", key: "name" },
    { label: "Số lượng", key: "quantity" },
    { label: "Trạng thái", key: "price" },
    { label: "Danh mục", key: "status" },
    { label: "Nhà bán", key: "category" },
  ];
  // this.id = id;
  // this.name = name;
  // this.quantity = quantity;
  // this.price = price;
  // this.status = status;
  // this.category = category;
  // this.merchant = merchant;
  return (
    <div className="card">
      <div className="card-header bg-secondary">
        <h3 className="card-title">Danh sách sản phẩm</h3>
      </div>

      <div className="card-body">
        <div className="row px-2 mb-2 mt-2">
          <div className="col-md-6">
            <Button
              as={CSVLink}
              data={data}
              headers={headers}
              variant="secondary"
            >
              Xuất file Excel
            </Button>
            <Button variant="danger" onClick={deleteBulkInfoHandler}>
              Xóa các danh mục đã chọn
            </Button>
          </div>
          <div className="col-md-6 text-right">
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            <select
              value={pageSize}
              onChange={(e) => setPageSize(+e.target.value)}
            >
              {[10, 25, 50].map((pageSize) => {
                return (
                  <option key={pageSize} value={pageSize}>
                    Hiện {pageSize} dòng
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <table
          {...getTableProps()}
          className="table table-bordered table-hover"
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    {...column.getHeaderProps()}
                  >
                    {column.render("Header")}{" "}
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <FontAwesomeIcon icon={solid("arrow-down")} />
                        ) : (
                          <FontAwesomeIcon icon={solid("arrow-up")} />
                        )
                      ) : (
                        ""
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell, i) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div style={{ textAlign: "right" }}>
          <span>
            Trang <strong>{pageIndex + 1}</strong> / {pageCount}
          </span>
          <button
            className="btn btn-dark"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            <FontAwesomeIcon icon={solid("angle-left")} />
          </button>

          <button
            className="btn btn-dark"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            <FontAwesomeIcon icon={solid("angle-right")} />
          </button>
        </div>
      </div>
      <ModalEditProduct
        editingProductId={editingProductId}
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
      />
    </div>
  );
};
export default CardProductsTable;
