import { useCallback, useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import {
  useExpanded,
  useGlobalFilter,
  useGroupBy,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import IndeterminateCheckbox from "../../../../../../common/components/IndeterminateCheckbox";

import { productsInTableRows } from "./cardProductsTable-test-data/productsInTable-rows";
import { confirm } from "react-confirm-box";

import { confirmBoxOptions } from "../../../../../../common/utils/options";
import Button from "react-bootstrap/Button";

import ModalEditProduct from "../../Forms/Product/ModalEditProduct";
import { CSVLink } from "react-csv";
import apiClient from "../../../../../../api";
import { tokenHeaderConfig } from "../../../../../../common/utils/api-config";
import ProductInTable from "./cardProductsTableUtils/ProductInTable";
import { backendServerPath } from "../../../../../../utilities/backendServerPath";
import classes from "./CardProductsTable.module.css";

const CardProductsTable = () => {
  // Modal State
  const [show, setShow] = useState(false);
  // Modal Handlers
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // Editing product id state
  const [editingProductId, setEditingProductId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(2);

  const [filter, setFilter] = useState("");
  const filterChangeHandler = (e) => {
    setFilter(e.target.value);
  };

  // React Table Handler
  const fetchProducts = useCallback(async () => {
    try {
      await apiClient.get("/sanctum/csrf-cookie");
      const response = await apiClient.get(
        `api/admin/product?page=${currentPage}&filter=${filter}`,
        tokenHeaderConfig
      );
      console.log(response.data);

      setLastPage(response.data.last_page);
      const transformedProducts = response.data.data.map((product) => {
        const productQuantity = product.kinds.reduce((prevVal, kind) => {
          return prevVal + kind.quantity;
        }, 0);

        return new ProductInTable(
          product.id,
          backendServerPath + product.kinds[0].image_1,
          product.name,
          productQuantity,
          product.price,
          product.status,
          product.category.name,
          product.brand
        );
      });

      setData(transformedProducts);
    } catch (error) {
      console.log(error);
    }
  }, [currentPage, filter]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const [data, setData] = useState(useMemo(() => productsInTableRows, []));

  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Ảnh cover",
        accessor: "img",
        Cell: ({ cell: { value } }) => (
          <div className={classes["product-img"]}>
            <img className={classes["product-img"]} src={value} alt="" />
          </div>
        ),
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
      // {
      //   Header: "Nhà bán",
      //   accessor: "merchant",
      // },
      {
        Header: "Chức năng",
        accessor: "functions",

        Cell: ({ cell }) => {
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
    // usePagination,
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
    rows,
    prepareRow,
    selectedFlatRows,
  } = tableInstance;

  const headers = [
    { label: "SKU", key: "sku" },
    { label: "Tên sản phẩm", key: "name" },
    { label: "Số lượng", key: "quantity" },
    { label: "Trạng thái", key: "status" },
    { label: "Danh mục", key: "category" },
    // { label: "Nhà bán", key: "category" },
  ];
  // this.id = id;
  // this.name = name;
  // this.quantity = quantity;
  // this.price = price;
  // this.status = status;
  // this.category = category;
  function nextPageHandler() {
    if (currentPage < lastPage) {
      setCurrentPage((previousPage) => previousPage + 1);
    }
  }

  function previousPageHandler() {
    if (currentPage > 1) {
      setCurrentPage((previousPage) => previousPage - 1);
    }
  }

  console.log(currentPage);

  function firstPageHandler() {
    setCurrentPage(1);
  }

  function lastPageHandler() {
    setCurrentPage(lastPage);
  }

  function changePageOnClickedValue(e) {
    setCurrentPage(+e.target.value);
  }

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
            {/*<GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />*/}
            <span>
              <strong className="mr-2">Tìm kiếm</strong>
              <input value={filter || ""} onChange={filterChangeHandler} />
            </span>
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
                    {column.render("Header")}
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
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <pre>
          <code>
            {JSON.stringify({
              selectedFlatRows: selectedFlatRows.map((row) => row.original),
            })}
          </code>
        </pre>
        <ul className="pagination">
          <li className="page-item" onClick={firstPageHandler}>
            <button className="page-link">&laquo;</button>
          </li>
          <li className="page-item" onClick={previousPageHandler}>
            <button className="page-link" aria-label="Previous">
              <span aria-hidden="true">&larr;</span>
              <span className="sr-only">Previous</span>
            </button>
          </li>

          {currentPage > 2 && (
            <li className="page-item">
              <button className="page-link" disabled>
                ...
              </button>
            </li>
          )}
          {Array.from(Array(lastPage), (e, i) => {
            return (
              <div key={i}>
                {i >= currentPage - 2 && i <= currentPage + 2 && (
                  <li
                    className={`page-item ${
                      Number(currentPage) === i + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      onClick={changePageOnClickedValue}
                      className="page-link"
                      value={i + 1}
                    >
                      {i + 1}
                    </button>
                  </li>
                )}
              </div>
            );
          })}
          {currentPage < lastPage - 3 && (
            <li className="page-item">
              <button className="page-link" disabled>
                ...
              </button>
            </li>
          )}
          <li className="page-item" onClick={nextPageHandler}>
            <button className="page-link" aria-label="Next">
              <span aria-hidden="true">&rarr;</span>
              <span className="sr-only">Next</span>
            </button>
          </li>
          <li className="page-item" onClick={lastPageHandler}>
            <button className="page-link">&raquo;</button>
          </li>
        </ul>
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
