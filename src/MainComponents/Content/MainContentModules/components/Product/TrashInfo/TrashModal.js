import {useCallback, useEffect, useMemo, useState} from "react";
import classes from "../../CardTable/CardProductsTable/CardProductsTable.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {useExpanded, useGlobalFilter, useGroupBy, useRowSelect, useSortBy, useTable,} from "react-table";
import {Modal, Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import apiClient from "../../../../../../api";
import ProductInTable from "../../CardTable/CardProductsTable/cardProductsTableUtils/ProductInTable";
import {backendServerPath} from "../../../../../../utilities/backendServerPath";
import {useNavigate} from "react-router-dom";
// import { confirm } from "react-confirm-box";

export default function TrashModel(props) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(2);
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
      // {
      //   Header: "Nhà bán",
      //   accessor: "merchant",
      // },
      {
        Header: "Chức năng",
        accessor: "functions",

        Cell: ({ cell }) => {
          // const rowValues = cell.row.values;
          const rowItemId = cell.row.values.id; // id from ProductInCart.js constructor
          // const rowItemId = row.index; // id from ProductInCart.js constructor
          return (
            <div>
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
            </div>
          );
        },
      },
    ],
    [directlyDeleteItem, restoreItem]
  );

  const fetchProductsInTrash = useCallback(async () => {
    try {
      const userToken = JSON.parse(localStorage.getItem("personalAccessToken"));
      await apiClient.get("/sanctum/csrf-cookie");
      const response = await apiClient.get(
        `api/admin/product-trash?page=${currentPage}&filter=${filter}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      // console.log(response.data);

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
          "Trong thùng rác",
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

  function firstPageHandler() {
    setCurrentPage(1);
  }

  function lastPageHandler() {
    setCurrentPage(lastPage);
  }

  function changePageOnClickedValue(e) {
    setCurrentPage(+e.target.value);
  }
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
        <div className="col-md-6 text-right">
          <span>
            <strong className="mr-2">Tìm kiếm</strong>
            <input value={filter || ""} onChange={filterChangeHandler} />
          </span>
        </div>
        <Table {...getTableProps()} striped bordered hover>
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
        </Table>
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
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={props.onHide}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
