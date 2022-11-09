import { useEffect, useMemo, useState } from "react";
import {
  useExpanded,
  useGlobalFilter,
  useGroupBy,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { confirm } from "react-confirm-box";
import { confirmBoxOptions } from "../../../../../../common/utils/options";
import Button from "react-bootstrap/Button";
import { CSVLink } from "react-csv";
import ModalUserDetails from "../../Forms/User/ModalUserDetails";
import apiClient from "../../../../../../api";
import UserInTable from "./cardUsersTable-utils/UserInTable";
import { formatMoney } from "../../../../../../common/utils/helperFunctions";
import ReactTable from "../../../../../../common/components/ReactTable";
import AdminPagination from "../../../../../../common/components/AdminPagination";
import useAdminPagination from "../../../../../../hooks/use-admin-pagination";
import useFetchingTableData from "../../../../../../hooks/use-fetching-table-data";
import FunctionalitiesDiv from "../../../../../../common/components/FunctionalitiesDiv";
import useModal from "../../../../../../hooks/use-modal";
import ServerFilter from "../../../../../../common/components/ServerFilter";
import useServerFilter from "../../../../../../hooks/use-server-filter";

const CardUsersTable = () => {
  const { show, setShow, handleShow, handleClose } = useModal();

  // Editing product id state
  const [userUuid, setUserUuid] = useState(null);

  // React Table Handler

  const [data, setData] = useState(useMemo(() => [], []));
  const columns = useMemo(
    () => [
      {
        Header: "Uuid người dùng",
        accessor: "uuid", // accessor is the "key" in the data
      },
      {
        Header: "Họ và tên",
        accessor: "name",
      },
      {
        Header: "Số điện thoại",
        accessor: "phoneNumber",
      },
      {
        Header: "Địa chỉ",
        accessor: "address",
      },
      {
        Header: "Tổng tiền đã chi",
        accessor: "totalMoneySpent",

        Cell: ({ cell, row }) => {
          const totalMoneySpent = cell.row.values.totalMoneySpent;

          return (
            <>
              {!isNaN(totalMoneySpent)
                ? formatMoney(totalMoneySpent)
                : totalMoneySpent}
            </>
          );
        },
      },
      {
        Header: "Chức năng",
        accessor: "functions",

        Cell: ({ cell, row }) => {
          const rowValues = cell.row.values;
          const rowItemUuid = cell.row.values.uuid; // id from ProductInCart.js constructor
          // const rowItemId = row.index; // id from ProductInCart.js constructor
          return (
            <FunctionalitiesDiv>
              <button
                className="btn btn-success"
                onClick={() => copyInfoHandler(rowValues)}
              >
                <FontAwesomeIcon icon={solid("copy")} />
              </button>
              <button
                className="btn btn-warning"
                onClick={() => viewMoreInfo(rowItemUuid)}
              >
                <FontAwesomeIcon icon={solid("magnifying-glass")} />
              </button>
              <button
                className="btn btn-danger"
                onClick={() => moveToTrash(rowItemUuid)}
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

  function viewMoreInfo(userUuid) {
    setUserUuid(userUuid);
    setShow(true);
  }

  async function moveToTrash(userUuid) {
    const result = await confirm(
      "Bạn có chắc chắn muốn xóa người dùng này?",
      confirmBoxOptions
    );
    if (result) {
      setData((prevState) =>
        prevState.filter((item) => item.uuid !== userUuid)
      );
      apiClient.get("/sanctum/csrf-cookie").then(() => {
        const userToken = JSON.parse(
          localStorage.getItem("personalAccessToken")
        );

        apiClient
          .get(`api/admin/user-to-tra/${userUuid}`, {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          })
          .then((response) => {
            alert(response.data.message);
          })
          .catch((error) => {
            if (error) {
              alert("Đã có lỗi xảy ra");
            }
          });
      });
    }
  }

  // const deleteBulkInfoHandler = async () => {
  //   // a variable from react table library
  //   const bulkId = selectedFlatRows.map((row) => row.original.id);
  //   console.log(bulkId);
  //
  //   const result = await confirm(
  //     "Bạn có chắc chắn muốn xóa các người dùng này?",
  //     confirmBoxOptions
  //   );
  //   if (result) {
  //     setData((prevState) => {
  //       return prevState.filter((item) => !bulkId.includes(item.id));
  //     });
  //   }
  // };
  const tableInstance = useTable(
    { columns, data },

    useGlobalFilter,
    useGroupBy,
    useSortBy,
    useExpanded,
    usePagination,
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
  // const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } =
  //   tableInstance;
  const { getTableProps, headerGroups, getTableBodyProps, rows, prepareRow } =
    tableInstance;
  const headers = [
    { label: "Uuid", key: "uuid" },
    { label: "Tên người dùng", key: "name" },
    { label: "Số điện thoại", key: "phoneNumber" },
    { label: "Địa chỉ mặc định", key: "address" },
    { label: "Tổng tiền đã chi", key: "totalMoneySpent" },
  ];

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

  const [itemPerPage, setItemPerPage] = useState(10);
  const { filter, filterChangeHandler } = useServerFilter(setCurrentPage);
  ////////////////////////////////
  // DATABASE FETCH HANDLERS
  // const [isLoading, setIsLoading] = useState(false);
  // const [hasError, setHasError] = useState(false);
  // const [noFoundSearchResult, setNoFoundSearchResult] = useState(false);
  // const fetchUsers = useCallback(async () => {
  //   setNoFoundSearchResult(false);
  //   setIsLoading(true);
  //   setData([]);
  //   try {
  //     const userToken = JSON.parse(localStorage.getItem("personalAccessToken"));
  //
  //     await apiClient.get("/sanctum/csrf-cookie");
  //
  //     const response = await apiClient.get(
  //       `api/admin/user?page=${currentPage}&itemPerPage=${itemPerPage}&filter=${filter}`,
  //       {
  //         headers: {
  //           Accept: "application/json",
  //           Authorization: `Bearer ${userToken}`,
  //         },
  //       }
  //     );
  //     setLastPage(response.data.last_page);
  //
  //     if (response.data.data.length > 0) {
  //       const transformedUsers = response.data.data.map((user) => {
  //         return new UserInTable(
  //           user.uuid,
  //           user.name,
  //           user.phone_number,
  //           user.address,
  //           user.total_money_spent === null
  //             ? "Chưa mua hàng lần nào"
  //             : user.total_money_spent
  //         );
  //       });
  //       setData(transformedUsers);
  //     } else {
  //       setNoFoundSearchResult(true);
  //     }
  //   } catch (error) {
  //     // alert(error.response.data.message);
  //     setHasError(true);
  //   }
  //   setIsLoading(false);
  // }, [currentPage, filter, itemPerPage]);

  function transformUsers(response) {
    setLastPage(response.data.last_page);

    if (response.data.data.length > 0) {
      return response.data.data.map((user) => {
        return new UserInTable(
          user.uuid,
          user.name,
          user.phone_number,
          user.address,
          user.total_money_spent === null
            ? "Chưa mua hàng lần nào"
            : user.total_money_spent
        );
      });
    }
  }
  const {
    isLoading,
    hasError,
    noFoundSearchResult,
    fetchData: fetchUsers,
  } = useFetchingTableData(
    `api/admin/user?page=${currentPage}&itemPerPage=${itemPerPage}&filter=${filter}`,
    setData,
    transformUsers
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="card">
      <div className="card-header bg-primary">
        <h3 className="card-title">Danh sách người dùng</h3>
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
            {/*<Button variant="danger" onClick={deleteBulkInfoHandler}>*/}
            {/*  Xóa các danh mục đã chọn*/}
            {/*</Button>*/}
          </div>
          <div className="col-md-6 text-right">
            <ServerFilter
              filter={filter}
              filterChangeHandler={filterChangeHandler}
            />
            <select
              className="ml-2"
              value={itemPerPage}
              onChange={(e) => {
                setItemPerPage(+e.target.value);
                setCurrentPage(1);
              }}
            >
              {[5, 10, 25, 50].map((pageSize) => {
                return (
                  <option key={pageSize} value={pageSize}>
                    Hiện {pageSize} dòng
                  </option>
                );
              })}
            </select>
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
          colSpan={6}
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
        <ModalUserDetails
          userUuid={userUuid}
          show={show}
          handleClose={handleClose}
          handleShow={handleShow}
        />
      </div>
    </div>
  );
};
export default CardUsersTable;
