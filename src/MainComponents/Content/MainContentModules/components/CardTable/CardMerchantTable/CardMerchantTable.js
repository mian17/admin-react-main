import { useEffect, useMemo, useState } from "react";
import apiClient from "../../../../../../api";
import { copyInfoHandler } from "../../../../../../common/utils/tableFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { confirm } from "react-confirm-box";
import { confirmBoxOptions } from "../../../../../../common/utils/options";
import {
  useExpanded,
  useGlobalFilter,
  useGroupBy,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import Button from "react-bootstrap/Button";
import { CSVLink } from "react-csv";
import MerchantInTable from "./cardMerchantTable-utils/MerchantInTable";
import ModalEditMerchant from "../../Forms/Merchant/ModalEditMerchant";
import { useNavigate } from "react-router-dom";
import useAdminPagination from "../../../../../../hooks/use-admin-pagination";
import AdminPagination from "../../../../../../common/components/AdminPagination";
import ReactTable from "../../../../../../common/components/ReactTable";
import FunctionalitiesDiv from "../../../../../../common/components/FunctionalitiesDiv";
import useFetchingTableData from "../../../../../../hooks/use-fetching-table-data";
import useModal from "../../../../../../hooks/use-modal";
import ServerFilter from "../../../../../../common/components/ServerFilter";
import useServerFilter from "../../../../../../hooks/use-server-filter";

const CardMerchantTable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(useMemo(() => [], []));

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
  const [itemPerPage, setItemPerPage] = useState(10);

  // const fetchMerchants = useCallback(async () => {
  //   setNoFoundSearchResult(false);
  //   setIsLoading(true);
  //   setData([]);
  //   try {
  //     const userToken = JSON.parse(localStorage.getItem("personalAccessToken"));
  //     await apiClient.get("/sanctum/csrf-cookie");
  //
  //     const response = await apiClient.get(
  //       `api/admin/merchant?page=${currentPage}&itemPerPage=${itemPerPage}&filter=${filter}`,
  //       {
  //         headers: {
  //           Accept: "application/json",
  //           Authorization: `Bearer ${userToken}`,
  //         },
  //       }
  //     );
  //     setLastPage(response.data.last_page);
  //     console.log(response);
  //
  //     if (response.data.data.length > 0) {
  //       const transformedMerchants = response.data.data.map((merchant) => {
  //         return new MerchantInTable(
  //           merchant.id,
  //           merchant.name,
  //           merchant.phone_number,
  //           merchant.address,
  //           merchant.email
  //         );
  //       });
  //       setData(transformedMerchants);
  //     } else {
  //       setNoFoundSearchResult(true);
  //     }
  //   } catch (error) {
  //     // alert(error.response.data.message);
  //     setHasError(true);
  //   }
  //   setIsLoading(false);
  // }, [currentPage, filter, itemPerPage]);

  function transformMerchants(response) {
    setLastPage(response.data.last_page);
    if (response.data.data.length > 0) {
      return response.data.data.map((merchant) => {
        return new MerchantInTable(
          merchant.id,
          merchant.name,
          merchant.phone_number,
          merchant.address,
          merchant.email
        );
      });
    }
  }

  const {
    isLoading,
    hasError,
    noFoundSearchResult,
    fetchData: fetchMerchants,
  } = useFetchingTableData(
    `api/admin/merchant?page=${currentPage}&itemPerPage=${itemPerPage}&filter=${filter}`,
    setData,
    transformMerchants,
    filter
  );
  useEffect(() => {
    fetchMerchants();
  }, [fetchMerchants]);

  const headers = [
    { label: "Id", key: "id" },
    { label: "Tên nhà bán", key: "name" },
    { label: "Số điện thoại", key: "phoneNumber" },
    { label: "Địa chỉ", key: "address" },
    { label: "Email", key: "email" },
    // { label: "Nhà bán", key: "category" },
  ];
  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id", // accessor is the "key" in the data
      },
      {
        Header: "Tên nhà bán",
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
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Chức năng",
        accessor: "functions",

        Cell: ({ cell }) => {
          const rowValues = cell.row.values;
          const rowItemId = cell.row.values.id;

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
                onClick={() => editInfoHandler(rowItemId)}
              >
                <FontAwesomeIcon icon={solid("pen-to-square")} />
              </button>
              <button
                className="btn btn-danger"
                // onClick={() => moveToTrash(rowItemUuid)}
                onClick={() => moveToTrash(rowItemId, navigate)}
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

  function editInfoHandler(merchantId) {
    setEditingMerchantId(merchantId);
    setShow(true);
  }

  async function moveToTrash(itemId, navigate) {
    const result = await confirm(
      "Bạn có chắc chắn muốn xóa nhà bán này?",
      confirmBoxOptions
    );
    if (result) {
      setData((prevState) => prevState.filter((item) => item.id !== itemId));
      apiClient.get("/sanctum/csrf-cookie").then(() => {
        const userToken = JSON.parse(
          localStorage.getItem("personalAccessToken")
        );
        apiClient
          .get(`api/admin/merchant-to-trash/${itemId}`, {
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
          });
      });
    }
  }

  const tableInstance = useTable(
    { columns, data },

    useGlobalFilter,
    useGroupBy,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect
  );
  const { getTableProps, headerGroups, getTableBodyProps, rows, prepareRow } =
    tableInstance;

  // Editing warehouse id state
  const [editingMerchantId, setEditingMerchantId] = useState(null);

  const { show, setShow, handleShow, handleClose } = useModal();

  return (
    <div className="col-12">
      <div className="card">
        <div className="card-header bg-primary">
          <h3 className="card-title">Danh sách các nhà bán</h3>
        </div>
        <div className="card-body">
          <div className="row px-2 mb-2 mt-2">
            <div className="col-md-6">
              {/*<Button*/}
              {/*  as={CSVLink}*/}
              {/*  data={data}*/}
              {/*  headers={headers}*/}
              {/*  variant="secondary"*/}
              {/*>*/}
              {/*  Xuất file Excel*/}
              {/*</Button>*/}
              <Button
                as={CSVLink}
                data={data}
                headers={headers}
                variant="secondary"
              >
                Xuất file Excel
              </Button>
              {/*/!*<Button variant="danger" onClick={deleteBulkInfoHandler}>*!/*/}
              {/*/!*  Xóa các danh mục đã chọn*!/*/}
              {/*/!*</Button>*!/*/}
            </div>
            <div className="col-md-6 text-right">
              <ServerFilter
                filter={filter}
                filterChangeHandler={filterChangeHandler}
              />
              <select
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
            emptyMessage="Không có nhà bán nào trong cơ sở dữ liệu"
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
      </div>
      <ModalEditMerchant
        editingMerchantId={editingMerchantId}
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
      />
    </div>
  );
};
export default CardMerchantTable;
