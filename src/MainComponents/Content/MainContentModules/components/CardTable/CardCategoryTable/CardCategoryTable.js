import { useContext, useEffect, useMemo, useState } from "react";
import { DATA as DUMP_DATA } from "./cardCategoryTable-utils/data";
// import { COLUMNS as specifiedColumns } from "./cardCategoryTable-utils/columns";
import { useGlobalFilter, usePagination, useTable } from "react-table";
import { Col, Row } from "react-bootstrap";
import apiClient from "../../../../../../api";
import Category from "./cardCategoryTable-utils/Category";
import GlobalFilter from "../../../../../../common/components/GlobalFilter";
import ModalEditCategory from "../../Forms/Category/ModalEditCategory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useNavigate } from "react-router-dom";
import useModal from "../../../../../../hooks/use-modal";
import useFetchingTableData from "../../../../../../hooks/use-fetching-table-data";
import MessageContext from "../../../../../../store/message-context";
import FunctionalitiesDiv from "../../../../../../common/components/FunctionalitiesDiv";
import ReactTableClientPagination from "../../../../../../common/components/ReactTableClientPagination";
import AdminPagination from "../../../../../../common/components/AdminPagination";

function recursiveChildrenCategoryAddition(
  category,
  parentCategoryReadyToPush,
  transformedCategories,
  level,
  pattern
) {
  level++;
  category.children_recursive.forEach((childCategory) => {
    const childParentCategoryReadyToPush = new Category(
      childCategory.id,
      `${pattern.repeat(level)} ${childCategory.name}`
    );
    transformedCategories.push(childParentCategoryReadyToPush);

    recursiveChildrenCategoryAddition(
      childCategory,
      childParentCategoryReadyToPush,
      transformedCategories,
      level,
      pattern
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
      // {
      //   Header: "Hình ảnh",
      //   accessor: "img",
      //   Cell: ({ cell: { value } }) => {
      //     return (
      //       <div className={classes["category-img"]}>
      //         <img className={classes["category-img"]} src={value} alt="" />
      //       </div>
      //     );
      //   },
      // },
      {
        Header: "Tên danh mục",
        accessor: "name",
        Cell: ({ cell }) => {
          const categoryName = cell.row.values.name;
          return <div className="text-left">{categoryName}</div>;
        },
      },
      // {
      //   Header: "Danh mục cha",
      //   accessor: "parentCategory",
      // },
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
              console.log(error);
              alert(error.response.data.message);
            });
        });
      }
    };
  };

  const tableInstance = useTable(
    { data, columns },
    useGlobalFilter,
    usePagination
  );

  const recursiveChildrenCategoryAdditionForFetching = (categoriesResponse) => {
    let transformedCategories = [];

    categoriesResponse.data.forEach((category) => {
      const parentCategoryReadyToPush = new Category(
        category.id,
        category.name
      );
      transformedCategories.push(parentCategoryReadyToPush);

      recursiveChildrenCategoryAddition(
        category,
        parentCategoryReadyToPush,
        transformedCategories,
        0,
        "||==="
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

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,

    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    // pageOptions,
    gotoPage,
    pageCount,
    prepareRow,
    state,
    setGlobalFilter,
  } = tableInstance;

  const { globalFilter, pageIndex } = state;

  const previousPageHandler = () => {
    previousPage();
  };
  const firstPageHandler = () => {
    gotoPage(0);
  };
  const nextPageHandler = () => {
    nextPage();
  };
  const lastPageHandler = () => {
    gotoPage(pageCount - 1);
  };
  const changePageOnClickedValue = (e) => {
    gotoPage(e.target.value - 1);
  };
  return (
    <div className="card">
      <div className="card-header bg-secondary">
        <h3 className="card-title">Danh sách danh mục</h3>
      </div>
      <div className="card-body">
        <Row className="mb-3 ">
          <Col>
            {/*<ClientSidePagination*/}
            {/*  previousPage={previousPage}*/}
            {/*  canPreviousPage={canPreviousPage}*/}
            {/*  pageIndex={pageIndex}*/}
            {/*  pageOptions={pageOptions}*/}
            {/*  nextPage={nextPage}*/}
            {/*  canNextPage={canNextPage}*/}
            {/*/>*/}
          </Col>
          <Col className="text-right">
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
          </Col>
        </Row>

        <ReactTableClientPagination
          getTableProps={getTableProps}
          headerGroups={headerGroups}
          getTableBodyProps={getTableBodyProps}
          page={page}
          prepareRow={prepareRow}
          isLoading={isLoading}
          hasError={hasError}
          noFoundSearchResult={noFoundSearchResult}
          colSpan={5}
          filter={globalFilter}
          emptyMessage="Danh mục bạn cầm tìm không có trong cơ sở dữ liệu"
        />
        <AdminPagination
          previousPageHandler={previousPageHandler}
          firstPageHandler={firstPageHandler}
          nextPageHandler={nextPageHandler}
          lastPageHandler={lastPageHandler}
          changePageOnClickedValue={changePageOnClickedValue}
          currentPage={pageIndex + 1}
          lastPage={pageCount}
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
