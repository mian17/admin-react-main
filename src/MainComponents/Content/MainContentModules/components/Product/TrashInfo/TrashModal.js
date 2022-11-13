import {useCallback, useEffect, useMemo, useState} from "react";
import classes from "../../CardTable/CardProductsTable/CardProductsTable.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {useExpanded, useGlobalFilter, useGroupBy, useRowSelect, useSortBy, useTable,} from "react-table";
import {Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import apiClient from "../../../../../../api";
import ProductInTable from "../../CardTable/CardProductsTable/cardProductsTableUtils/ProductInTable";
import {backendServerPath} from "../../../../../../utilities/backendServerPath";
import {useNavigate} from "react-router-dom";
import FunctionalitiesDiv from "../../../../../../common/components/FunctionalitiesDiv";
import useAdminPagination from "../../../../../../hooks/use-admin-pagination";
import useFetchingTableData from "../../../../../../hooks/use-fetching-table-data";
import ReactTable from "../../../../../../common/components/ReactTable";
import AdminPagination from "../../../../../../common/components/AdminPagination";
// import { confirm } from "react-confirm-box";

export default function TrashModel(props) {
  const navigate = useNavigate();
  const {
    currentPage,
    lastPage,
    setLastPage,
    nextPageHandler,
    previousPageHandler,
    firstPageHandler,
    lastPageHandler,
    changePageOnClickedValue,
  } = useAdminPagination();

  const [filter, setFilter] = useState("");
  const filterChangeHandler = (e) => {
    setFilter(e.target.value);
  };
  const [data, setData] = useState(useMemo(() => [], []));

  const restoreItem = useCallback(
    (rowItemId) => {
      apiClient.get("/sanctum/csrf-cookie").then(() => {
        const userToken = JSON.parse(
          localStorage.getItem("personalAccessToken")
        );
        apiClient
          .get(`api/admin/product-trash-restore/${rowItemId}`, {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          })
          .then((response) => {
            alert(response.data.message);
            navigate(0);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
    [navigate]
  );

  const directlyDeleteItem = useCallback(
    (rowItemId) => {
      const result = window.confirm(
        "Bạn có chắc chắn muốn xóa vĩnh viễn sản phẩm này không, một khi đã xóa bạn sẽ KHÔNG hoàn tác được?"
      );
      if (result) {
        apiClient.get("/sanctum/csrf-cookie").then(() => {
          const userToken = JSON.parse(
            localStorage.getItem("personalAccessToken")
          );
          apiClient
            .delete(`api/admin/product/${rowItemId}`, {
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${userToken}`,
              },
            })
            .then((response) => {
              alert(response.data.message);
              navigate(0);
            })
            .catch((error) => {
              console.log(error);
              if (error.response.status === 500) {
                alert(
                  "Sản phẩm này đã tồn tại trong giỏ hàng của khách hàng. Bạn không thể xóa vĩnh viễn sản phẩm này được."
                );
              }
            });
        });
      }
    },
    [navigate]
  );

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
      {
        Header: "Chức năng",
        accessor: "functions",

        Cell: ({ cell }) => {
          // const rowValues = cell.row.values;
          const rowItemId = cell.row.values.id; // id from ProductInCart.js constructor
          // const rowItemId = row.index; // id from ProductInCart.js constructor
          return (
            <FunctionalitiesDiv>
              <button
                className="btn btn-success"
                onClick={() => restoreItem(rowItemId)}
              >
                <FontAwesomeIcon icon={solid("rotate-left")} /> Khôi phục
              </button>
              <button
                className="btn btn-danger"
                onClick={() => directlyDeleteItem(rowItemId)}
              >
                <FontAwesomeIcon icon={solid("trash-can")} /> Xóa vĩnh viễn
              </button>
            </FunctionalitiesDiv>
          );
        },
      },
    ],
    [directlyDeleteItem, restoreItem]
  );

  // const fetchProductsInTrash = useCallback(async () => {
  //   try {
  //     const userToken = JSON.parse(localStorage.getItem("personalAccessToken"));
  //     await apiClient.get("/sanctum/csrf-cookie");
  //     const response = await apiClient.get(
  //       `api/admin/product-trash?page=${currentPage}&filter=${filter}`,
  //       {
  //         headers: {
  //           Accept: "application/json",
  //           Authorization: `Bearer ${userToken}`,
  //         },
  //       }
  //     );
  //     // console.log(response.data);
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
  //         "Trong thùng rác",
  //         product.category.name,
  //         product.brand
  //       );
  //     });
  //
  //     setData(transformedProducts);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [currentPage, filter]);

  function transformProductsInTrash(response) {
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
        "Trong thùng rác",
        product.category.name,
        product.brand
      );
    });
  }

  // console.log(transformProductsInTrash);

  const {
    isLoading,
    hasError,
    noFoundSearchResult,
    fetchData: fetchProductsInTrash,
  } = useFetchingTableData(
    `api/admin/product-trash?page=${currentPage}&filter=${filter}`,
    setData,
    transformProductsInTrash,
    filter
  );

  useEffect(() => {
    fetchProductsInTrash();
  }, [fetchProductsInTrash]);

  const tableInstance = useTable(
    { columns, data },
    useGlobalFilter,
    useGroupBy,
    useSortBy,
    useExpanded,
    useRowSelect
    // (hooks) => {
    //   hooks.visibleColumns.push((columns) => {
    //     return [
    //       {
    //         id: "selection",
    //         Header: ({ getToggleAllRowsSelectedProps }) => (
    //           <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
    //         ),
    //         Cell: ({ row }) => (
    //           <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
    //         ),
    //       },
    //       ...columns,
    //     ];
    //   });
    // }
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    // selectedFlatRows,
  } = tableInstance;

  // function nextPageHandler() {
  //   if (currentPage < lastPage) {
  //     setCurrentPage((previousPage) => previousPage + 1);
  //   }
  // }
  //
  // function previousPageHandler() {
  //   if (currentPage > 1) {
  //     setCurrentPage((previousPage) => previousPage - 1);
  //   }
  // }
  //
  // function firstPageHandler() {
  //   setCurrentPage(1);
  // }
  //
  // function lastPageHandler() {
  //   setCurrentPage(lastPage);
  // }
  //
  // function changePageOnClickedValue(e) {
  //   setCurrentPage(+e.target.value);
  // }
  return (
    <Modal
      size="lg"
      show={props.show}
      onHide={props.onHide}
      // style={{ zIndex: 4 }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Thùng rác</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row mb-2">
          <div className="col-sm-6">&nbsp;</div>

          <div className="col-sm-6 text-right">
            <span>
              <strong className="mr-2">Tìm kiếm</strong>
              <input value={filter || ""} onChange={filterChangeHandler} />
            </span>
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
          colSpan={8}
          emptyMessage="Không có sản phẩm nào trong thùng rác"
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
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={props.onHide}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
