import { useMemo, useState } from "react";
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
// import IndeterminateCheckbox from "../../../../../../common/components/IndeterminateCheckbox";
import { productsInTableRows } from "./cardProductsTable-test-data/productsInTable-rows";
import { confirm } from "react-confirm-box";

import { confirmBoxOptions } from "../../../../../../common/utils/options";
import Button from "react-bootstrap/Button";

import ModalEditProduct from "../../Forms/Product/ModalEditProduct";
import { CSVLink } from "react-csv";
import apiClient from "../../../../../../api";
import ProductInTable from "./cardProductsTableUtils/ProductInTable";
import { backendServerPath } from "../../../../../../utilities/backendServerPath";
import classes from "./CardProductsTable.module.css";
import { useNavigate } from "react-router-dom";
import useAdminPagination from "../../../../../../hooks/use-admin-pagination";
import AdminPagination from "../../../../../../common/components/AdminPagination";
import ReactTable from "../../../../../../common/components/ReactTable";
import { formatMoney } from "../../../../../../common/utils/helperFunctions";
import useModal from "../../../../../../hooks/use-modal";
import useFetchingTableData from "../../../../../../hooks/use-fetching-table-data";
import ServerFilter from "../../../../../../common/components/ServerFilter";
import useServerFilter from "../../../../../../hooks/use-server-filter";
import useDebounce from "../../../../../../hooks/use-debounce";
import IndeterminateCheckbox from "../../../../../../common/components/IndeterminateCheckbox";

const CardProductsTable = () => {
  const navigate = useNavigate();

  const { show, setShow, handleShow, handleClose } = useModal();

  // Editing product id state
  const [editingProductId, setEditingProductId] = useState(null);

  // const [currentPage, setCurrentPage] = useState(1);
  // const [lastPage, setLastPage] = useState(2);

  const {
    currentPage,
    setCurrentPage,
    lastPage,
    setLastPage,
    nextPageHandler,
    previousPageHandler,
    firstPageHandler,
    lastPageHandler,
    changePageOnClickedValue,
  } = useAdminPagination();

  // const [filter, setFilter] = useState("");
  // const filterChangeHandler = (e) => {
  //   setFilter(e.target.value);
  //   setCurrentPage(1);
  // };

  const { filter, filterChangeHandler } = useServerFilter(setCurrentPage);

  // React Table Handler
  // const fetchProducts = useCallback(async () => {
  //   try {
  //     const userToken = JSON.parse(localStorage.getItem("personalAccessToken"));
  //     await apiClient.get("/sanctum/csrf-cookie");
  //     const response = await apiClient.get(
  //       `api/admin/product?page=${currentPage}&filter=${filter}`,
  //       {
  //         headers: {
  //           Accept: "application/json",
  //           Authorization: `Bearer ${userToken}`,
  //         },
  //       }
  //     );
  //
  //     setLastPage(response.data.last_page);
  //     const transformedProducts = response.data.data.map((product) => {
  //       const productQuantity = product.kinds.reduce((prevVal, kind) => {
  //         return prevVal + kind.quantity;
  //       }, 0);
  //
  //       return new ProductInTable(
  //         product.id,
  //         backendServerPath + product.kinds[0].image_1,
  //         product.name,
  //         productQuantity,
  //         product.price,
  //         product.status,
  //         product.category.name,
  //         product.brand
  //       );
  //     });
  //
  //     setData(transformedProducts);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [currentPage, filter, setLastPage]);

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

        Cell: ({ cell }) => {
          const price = cell.row.values.price;

          return <>{!isNaN(price) ? formatMoney(price) : price}</>;
        },
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
        Header: "Chức năng",
        accessor: "functions",

        Cell: ({ cell }) => {
          const rowValues = cell.row.values;
          const rowItemId = cell.row.values.id; // id from ProductInCart.js constructor
          // const rowItemId = row.index; // id from ProductInCart.js constructor
          return (
            <div className="d-flex justify-content-between m-1">
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
                onClick={() => moveProductToTrash(rowItemId)}
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

  function transformProductResponse(response) {
    setLastPage(response.data.last_page);
    return response.data.data.map((product) => {
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
  }

  const {
    isLoading,
    hasError,
    noFoundSearchResult,
    fetchData: fetchProducts,
  } = useFetchingTableData(
    `api/admin/product?page=${currentPage}&filter=${filter}`,
    setData,
    transformProductResponse,
    filter
  );

  useDebounce(fetchProducts, filter);
  // useEffect(() => {
  //   if (
  //     filter.length > MAXIMUM_SEARCH_KEYWORD_LENGTH_TO_START_SENDING_REQUEST
  //   ) {
  //     const getData = setTimeout(fetchProducts, 2000);
  //     return () => clearTimeout(getData);
  //   } else {
  //     fetchProducts();
  //   }
  // }, [fetchProducts, filter.length]);

  function copyInfoHandler(valueObj) {
    let readyForClipboard = "";
    for (const property in valueObj) {
      if (property === "functions" || property === "img") continue;
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

  async function moveProductToTrash(productId) {
    const result = await confirm(
      "Bạn có chắc chắn muốn đưa sản phẩm này vào thùng rác?",
      confirmBoxOptions
    );
    if (result) {
      setData((prevState) =>
        prevState.filter((product) => product.id !== productId)
      );
      apiClient.get("/sanctum/csrf-cookie").then(() => {
        const userToken = JSON.parse(
          localStorage.getItem("personalAccessToken")
        );

        apiClient
          .get(`api/admin/product-to-trash/${productId}`, {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          })
          .then((response) => {
            console.log(response);
            navigate(0);
          })
          .catch((error) => {
            console.log(error);
            alert(error.message);
          });
      });
    }
  }

  // Not yet implemented Handler - DO NOT DELETE
  // const deleteBulkInfoHandler = async () => {
  //   // a variable from react table library
  //   const bulkId = selectedFlatRows.map((row) => row.original.id);
  //   // console.log(bulkId);
  //
  //   const result = await confirm(
  //     "Bạn có chắc chắn muốn xóa các sản phẩm này?",
  //     confirmBoxOptions
  //   );
  //   if (result) {
  //     setData((prevState) => {
  //       return prevState.filter((product) => !bulkId.includes(product.id));
  //     });
  //   }
  // };

  const tableInstance = useTable(
    { columns, data },
    useGlobalFilter,
    useGroupBy,
    useSortBy,
    useExpanded,
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
    // selectedFlatRows,
  } = tableInstance;

  const headers = [
    { label: "Id", key: "id" },
    { label: "Tên sản phẩm", key: "name" },
    { label: "Số lượng", key: "quantity" },
    { label: "Trạng thái", key: "status" },
    { label: "Danh mục", key: "category" },
    // { label: "Nhà bán", key: "category" },
  ];
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
              Xuất file CSV
            </Button>
            {/*<Button variant="danger" onClick={deleteBulkInfoHandler}>*/}
            {/*  Xóa các danh mục đã chọn*/}
            {/*</Button>*/}
          </div>
          <div className="col-md-6 text-right">
            {/*<GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />*/}
            <ServerFilter
              filter={filter}
              filterChangeHandler={filterChangeHandler}
            />
          </div>
        </div>
        {/*Old table with indeterminate selection and sort by clicking table head*/}

        {/*<table*/}
        {/*  {...getTableProps()}*/}
        {/*  className="table table-bordered table-hover"*/}
        {/*>*/}
        {/*  <thead>*/}
        {/*    {headerGroups.map((headerGroup) => (*/}
        {/*      <tr {...headerGroup.getHeaderGroupProps()}>*/}
        {/*        {headerGroup.headers.map((column) => (*/}
        {/*          <th*/}
        {/*            {...column.getHeaderProps(column.getSortByToggleProps())}*/}
        {/*            {...column.getHeaderProps()}*/}
        {/*          >*/}
        {/*            {column.render("Header")}*/}
        {/*            <span>*/}
        {/*              {column.isSorted ? (*/}
        {/*                column.isSortedDesc ? (*/}
        {/*                  <FontAwesomeIcon icon={solid("arrow-down")} />*/}
        {/*                ) : (*/}
        {/*                  <FontAwesomeIcon icon={solid("arrow-up")} />*/}
        {/*                )*/}
        {/*              ) : (*/}
        {/*                ""*/}
        {/*              )}*/}
        {/*            </span>*/}
        {/*          </th>*/}
        {/*        ))}*/}
        {/*      </tr>*/}
        {/*    ))}*/}
        {/*  </thead>*/}

        {/*  <tbody {...getTableBodyProps()}>*/}
        {/*    {rows.map((row) => {*/}
        {/*      prepareRow(row);*/}
        {/*      return (*/}
        {/*        <tr {...row.getRowProps()}>*/}
        {/*          {row.cells.map((cell) => {*/}
        {/*            return (*/}
        {/*              <td {...cell.getCellProps()}>{cell.render("Cell")}</td>*/}
        {/*            );*/}
        {/*          })}*/}
        {/*        </tr>*/}
        {/*      );*/}
        {/*    })}*/}
        {/*  </tbody>*/}
        {/*</table>*/}
        <ReactTable
          getTableProps={getTableProps}
          headerGroups={headerGroups}
          getTableBodyProps={getTableBodyProps}
          rows={rows}
          prepareRow={prepareRow}
          isLoading={isLoading}
          hasError={hasError}
          noFoundSearchResult={noFoundSearchResult}
          colSpan={8}
          emptyMessage="Không có sản phẩm nào trong cơ sở dữ liệu"
          filter={filter}
        />
        <AdminPagination
          firstPageHandler={firstPageHandler}
          previousPageHandler={previousPageHandler}
          currentPage={currentPage}
          lastPage={lastPage}
          changePageOnClickedValue={changePageOnClickedValue}
          nextPageHandler={nextPageHandler}
          lastPageHandler={lastPageHandler}
        />
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
