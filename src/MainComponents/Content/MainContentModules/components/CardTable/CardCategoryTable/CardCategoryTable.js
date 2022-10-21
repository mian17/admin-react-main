import { useCallback, useEffect, useMemo, useState } from "react";
import { DATA as DUMP_DATA } from "./cardCategoryTable-utils/data";
// import { COLUMNS as specifiedColumns } from "./cardCategoryTable-utils/columns";
import { useGlobalFilter, useTable } from "react-table";
import { Col, Row, Table } from "react-bootstrap";
import apiClient from "../../../../../../api";
import Category from "./cardCategoryTable-utils/Category";
import { backendServerPath } from "../../../../../../utilities/backendServerPath";

import classes from "./CardCategoryTable.module.css";
import GlobalFilter from "../../../../../../common/components/GlobalFilter";
import ModalEditCategory from "../../Forms/Category/ModalEditCategory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useNavigate } from "react-router-dom";

const CardCategoryTable = () => {
  const navigate = useNavigate();

  const [data, setData] = useState(useMemo(() => DUMP_DATA, []));
  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Hình ảnh",
        accessor: "img",
        Cell: ({ cell: { value } }) => {
          return (
            <div className={classes["category-img"]}>
              <img className={classes["category-img"]} src={value} alt="" />
            </div>
          );
        },
      },
      {
        Header: "Tên danh mục",
        accessor: "name",
      },
      {
        Header: "Danh mục cha",
        accessor: "parentCategory",
      },
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
                className="btn btn-warning"
                onClick={() => editInfoHandler(rowItemId)}
              >
                <FontAwesomeIcon icon={solid("pen-to-square")} />
              </button>
              <button
                className="btn btn-danger"
                onClick={deleteCategoryHandler(rowItemId)}
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
  // Editing product id state
  const [editingCategoryId, setEditingCategoryId] = useState(null);

  // Modal State
  const [show, setShow] = useState(false);
  // Modal Handlers
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  function editInfoHandler(categoryId) {
    setEditingCategoryId(categoryId);
    setShow(true);
  }

  function deleteCategoryHandler(rowItemId) {
    return () => {
      const result = window.confirm(
        "Bạn có muốn xóa danh mục này VĨNH VIỄN không?"
      );
      if (result) {
        const userToken = JSON.parse(
          localStorage.getItem("personalAccessToken")
        );
        apiClient.get("/sanctum/csrf-cookie").then(() => {
          apiClient
            .delete(`api/admin/category/${rowItemId}`, {
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
              alert(error.response.data.message);
            });
        });
      }
    };
  }
  const tableInstance = useTable({ data, columns }, useGlobalFilter);

  const fetchCategories = useCallback(async () => {
    try {
      const userToken = JSON.parse(localStorage.getItem("personalAccessToken"));
      await apiClient.get("/sanctum/csrf-cookie");
      const categoriesResponse = await apiClient.get("api/admin/category", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });
      const transformedCategories = [];

      categoriesResponse.data.forEach((category) => {
        const parentCategoryReadyToPush = new Category(
          category.id,
          category.name,
          backendServerPath + category.img_url
        );

        transformedCategories.push(parentCategoryReadyToPush);

        if (category.children_recursive.length > 0) {
          category.children_recursive.forEach((childCategory) => {
            transformedCategories.push(
              new Category(
                childCategory.id,
                childCategory.name,
                backendServerPath + childCategory.img_url,
                parentCategoryReadyToPush.name
              )
            );
          });
        }
      });

      setData(transformedCategories);
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = tableInstance;

  const { globalFilter } = state;

  return (
    <div className="card">
      <div className="card-header bg-secondary">
        <h3 className="card-title">Danh sách danh mục</h3>
      </div>
      <div className="card-body">
        <Row className="mb-3 text-right">
          <Col>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
          </Col>
        </Row>
        <Table
          {...getTableProps()}
          striped
          bordered
          hover
          responsive
          className={classes["table"]}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    className={classes["sticky-table-header"]}
                    {...column.getHeaderProps()}
                  >
                    {column.render("Header")}
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
                      <td
                        className={classes["table-text-center"]}
                        {...cell.getCellProps()}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      <ModalEditCategory
        editingCategoryId={editingCategoryId}
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
      />
    </div>
  );
};
export default CardCategoryTable;
