import { useEffect, useMemo, useState } from "react";
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
import {
  createIndeterminateCheckboxes,
  formatMoney,
} from "../../../../../../common/utils/helperFunctions";
import useModal from "../../../../../../hooks/use-modal";
import useFetchingTableData from "../../../../../../hooks/use-fetching-table-data";
import ServerFilter from "../../../../../../common/components/ServerFilter";
import useServerFilter from "../../../../../../hooks/use-server-filter";
import useDebounce from "../../../../../../hooks/use-debounce";
import TooltipButton from "../../../../../../common/components/TooltipButton";

const CardProductsTable = () => {
  const navigate = useNavigate();

  const { show, setShow, handleShow, handleClose } = useModal();

  const [editingProductId, setEditingProductId] = useState(null);

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

  const { filter, filterChangeHandler } = useServerFilter(setCurrentPage);

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
        disableSortBy: true,
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
        disableSortBy: true,

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
  const tableInstance = useTable(
    {
      columns,
      data,
      // manualPagination: true,
      manualSortBy: true,
      // enableSorting: true,
      // manualSorting: true,
    },
    useGlobalFilter,
    useGroupBy,
    useSortBy,
    useExpanded,
    useRowSelect,
    createIndeterminateCheckboxes
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,

    state,
  } = tableInstance;

  function transformProductResponse(response) {
    setLastPage(response.data.last_page);
    return response.data.data.map((product) => {
      // const productQuantity = product.kinds.reduce((prevVal, kind) => {
      //   return prevVal + kind.quantity;
      // }, 0);
      return new ProductInTable(
        product.id,
        backendServerPath + product.kinds[0].image_1,
        product.name,
        product.kinds_sum_quantity,
        product.price,
        product.status,
        product.category.name,
        product.brand
      );
    });
  }

  const [columnState, setColumnState] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  // console.log(state.sortBy);
  useEffect(() => {
    if (state.sortBy.length > 0) {
      const { id: column, desc } = state.sortBy[0];
      setColumnState(column);
      setSortDirection(desc ? "desc" : "asc");
    }
  }, [state]);

  // console.log(column, desc);
  const {
    isLoading,
    hasError,
    noFoundSearchResult,
    fetchData: fetchProducts,
  } = useFetchingTableData(
    `api/admin/product?page=${currentPage}&filter=${filter}&column=${
      columnState === undefined ? "" : columnState
    }&direction=${sortDirection === undefined ? "" : sortDirection}`,
    setData,
    transformProductResponse,
    filter
  );

  useDebounce(fetchProducts, filter);

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

  const selectedRowsProductIds = selectedFlatRows.map((row) => row.original.id);

  const deleteBulkInfoHandler = async () => {
    const result = await confirm(
      "Bạn có chắc chắn muốn di chuyển các sản phẩm này vào thùng rác?",
      confirmBoxOptions
    );
    if (result) {
      apiClient.get("/sanctum/csrf-cookie").then(() => {
        const userToken = JSON.parse(
          localStorage.getItem("personalAccessToken")
        );
        apiClient
          .post(
            `api/admin/move-products-to-trash/`,
            { move_to_trash_item_ids: selectedRowsProductIds },
            {
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${userToken}`,
              },
            }
          )
          .then((response) => {
            console.log(response);
            navigate(0);
          })
          .catch((error) => {
            console.log(error);
            alert(error.message);
          });
      });
      setData((prevState) => {
        return prevState.filter(
          (product) => !selectedRowsProductIds.includes(product.id)
        );
      });
    }
  };

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
            {selectedRowsProductIds.length < 1 && (
              <Button
                as={CSVLink}
                data={data}
                headers={headers}
                variant="secondary"
              >
                Xuất file CSV
              </Button>
            )}

            {selectedRowsProductIds && selectedRowsProductIds.length > 0 && (
              <TooltipButton
                fontAwesomeIcon={solid("trash-can")}
                functionToProcessOnClick={deleteBulkInfoHandler}
                title="Di chuyển vào thùng rác"
                bootstrapVariant="danger"
              />
            )}
          </div>
          <div className="col-md-6 text-right">
            {/*<GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />*/}
            <ServerFilter
              filter={filter}
              filterChangeHandler={filterChangeHandler}
            />
          </div>
        </div>
        <ReactTable
          getTableProps={getTableProps}
          headerGroups={headerGroups}
          getTableBodyProps={getTableBodyProps}
          rows={rows}
          prepareRow={prepareRow}
          isLoading={isLoading}
          hasError={hasError}
          noFoundSearchResult={noFoundSearchResult}
          colSpan={9}
          emptyMessage="Không có sản phẩm nào trong cơ sở dữ liệu"
          filter={filter}
          enableSort={true}
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
