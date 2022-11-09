import {useContext, useEffect, useMemo, useState} from "react";
import {DATA as DUMP_DATA} from "./cardCategoryTable-utils/data";
// import { COLUMNS as specifiedColumns } from "./cardCategoryTable-utils/columns";
import {useGlobalFilter, useTable} from "react-table";
import {Col, Row} from "react-bootstrap";
import apiClient from "../../../../../../api";
import Category from "./cardCategoryTable-utils/Category";
import {backendServerPath} from "../../../../../../utilities/backendServerPath";

import classes from "./CardCategoryTable.module.css";
import GlobalFilter from "../../../../../../common/components/GlobalFilter";
import ModalEditCategory from "../../Forms/Category/ModalEditCategory";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {useNavigate} from "react-router-dom";
import ReactTable from "../../../../../../common/components/ReactTable";
import useModal from "../../../../../../hooks/use-modal";
import useFetchingTableData from "../../../../../../hooks/use-fetching-table-data";
import MessageContext from "../../../../../../store/message-context";
import FunctionalitiesDiv from "../../../../../../common/components/FunctionalitiesDiv";

// function recursiveChildrenCategoryAddition(category, parentCategoryReadyToPush, transformedCategories) {
//   if (category.children_recursive.length > 0) {
//     category.children_recursive.forEach((childCategory) => {
//       const childParentCategoryReadyToPush = new Category(
//         childCategory.id,
//         childCategory.name,
//         backendServerPath + childCategory.img_url,
//         parentCategoryReadyToPush.name
//       );
//       transformedCategories.push(childParentCategoryReadyToPush);
//
//       if (childCategory.children_recursive.length > 0) {
//         childCategory.children_recursive.forEach((childChildCategory) => {
//           const childChildParentCategoryReadyToPush = new Category(
//             childChildCategory.id,
//             childChildCategory.name,
//             backendServerPath + childChildCategory.img_url,
//             childParentCategoryReadyToPush.name
//           );
//           transformedCategories.push(childChildParentCategoryReadyToPush);
//         });
//       }
//     });
//   }
// }
function recursiveChildrenCategoryAddition(
  category,
  parentCategoryReadyToPush,
  transformedCategories
) {
  category.children_recursive.forEach((childCategory) => {
    const childParentCategoryReadyToPush = new Category(
      childCategory.id,
      childCategory.name,
      backendServerPath + childCategory.img_url,
      parentCategoryReadyToPush.name
    );
    transformedCategories.push(childParentCategoryReadyToPush);

    recursiveChildrenCategoryAddition(
      childCategory,
      childParentCategoryReadyToPush,
      transformedCategories
    );
  });
}

const CardCategoryTable = () => {
  const navigate = useNavigate();

  const [data, setData] = useState(useMemo(() => DUMP_DATA, []));
  const { setMessage } = useContext(MessageContext);
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
            <FunctionalitiesDiv hasNoSpaceBetween>
              <button
                className="btn btn-warning mr-2"
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
            </FunctionalitiesDiv>
          );
        },
      },
    ],
    []
  );
  // Editing product id state
  const [editingCategoryId, setEditingCategoryId] = useState(null);

  const { show, setShow, handleShow, handleClose } = useModal();

  const editInfoHandler = (categoryId) => {
    setEditingCategoryId(categoryId);
    setShow(true);
  };

  const deleteCategoryHandler = (rowItemId) => {
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
  };

  const tableInstance = useTable({ data, columns }, useGlobalFilter);
  // const [isLoading, setIsLoading] = useState(false);
  // const [hasError, setHasError] = useState(false);
  // const [noFoundSearchResult, setNoFoundSearchResult] = useState(false);

  const recursiveChildrenCategoryAdditionForFetching = (categoriesResponse) => {
    let transformedCategories = [];

    categoriesResponse.data.forEach((category) => {
      const parentCategoryReadyToPush = new Category(
        category.id,
        category.name,
        backendServerPath + category.img_url
      );
      transformedCategories.push(parentCategoryReadyToPush);

      recursiveChildrenCategoryAddition(
        category,
        parentCategoryReadyToPush,
        transformedCategories
      );
    });
    return transformedCategories;
  };

  const {
    isLoading,
    hasError,
    noFoundSearchResult,
    fetchData: fetchCategories,
  } = useFetchingTableData(
    "api/admin/category",
    setData,
    recursiveChildrenCategoryAdditionForFetching
  );

  // const fetchCategories = useCallback(async () => {
  //   setNoFoundSearchResult(false);
  //   setIsLoading(true);
  //   setData([]);
  //   try {
  //     const userToken = JSON.parse(localStorage.getItem("personalAccessToken"));
  //     await apiClient.get("/sanctum/csrf-cookie");
  //     const categoriesResponse = await apiClient.get("api/admin/category", {
  //       headers: {
  //         Accept: "application/json",
  //         Authorization: `Bearer ${userToken}`,
  //       },
  //     });
  //     let transformedCategories = [];
  //
  //     categoriesResponse.data.forEach((category) => {
  //       const parentCategoryReadyToPush = new Category(
  //         category.id,
  //         category.name,
  //         backendServerPath + category.img_url
  //       );
  //       transformedCategories.push(parentCategoryReadyToPush);
  //
  //       recursiveChildrenCategoryAddition(
  //         category,
  //         parentCategoryReadyToPush,
  //         transformedCategories
  //       );
  //     });
  //
  //     setData(transformedCategories);
  //   } catch (error) {
  //     console.log(error);
  //     setHasError(true);
  //     // alert("Đã có lỗi xảy ra trong quá trình tải các danh mục.");
  //   }
  //   setIsLoading(false);
  // }, []);
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
        <ReactTable
          getTableProps={getTableProps}
          headerGroups={headerGroups}
          getTableBodyProps={getTableBodyProps}
          rows={rows}
          prepareRow={prepareRow}
          isLoading={isLoading}
          hasError={hasError}
          noFoundSearchResult={noFoundSearchResult}
          colSpan={5}
        />
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
