import { useMemo, useState } from "react";
import {
  useExpanded,
  useGlobalFilter,
  useGroupBy,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import IndeterminateCheckbox from "../../../../../../common/components/IndeterminateCheckbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { confirm } from "react-confirm-box";
import { confirmBoxOptions } from "../../../../../../common/utils/options";
import { cardUserInTableRows } from "./cardUsersTable-test-data/cardUserInTable-rows";
import Button from "react-bootstrap/Button";
import { CSVLink } from "react-csv";
import GlobalFilter from "../../../../../../common/components/GlobalFilter";
import ModalEditUser from "../../Forms/User/ModalEditUser";

const CardUsersTable = () => {
  // Mã khách hàng, tên kh, điện thoại, địa chỉ, lần cuối mua hàng, tổng tiền hàng, tổng nợ, tính năng
  // Modal State
  const [show, setShow] = useState(false);
  // Modal Handlers
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // Editing product id state
  const [editingUserId, setEditingUserId] = useState(null);

  // React Table Handler

  const [data, setData] = useState(useMemo(() => cardUserInTableRows, []));
  const columns = useMemo(
    () => [
      {
        Header: "Id người dùng",
        accessor: "id", // accessor is the "key" in the data
      },
      {
        Header: "Tên người dùng",
        accessor: "name",
      },
      {
        Header: "Số điện thoại",
        accessor: "phoneNumber",
      },
      {
        Header: "Địa chỉ mặc định",
        accessor: "defaultAddress",
      },

      {
        Header: "Phân quyền",
        accessor: "role",
      },
      {
        Header: "Tổng tiền đã chi",
        accessor: "totalMoneySpent",
      },
      {
        Header: "Chức năng",
        accessor: "functions",

        Cell: ({ cell, row }) => {
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
    setEditingUserId(productId);
    setShow(true);
  }
  async function deleteInfoHandler(itemIdToDelete) {
    const result = await confirm(
      "Bạn có chắc chắn muốn xóa sản phẩm này?",
      confirmBoxOptions
    );
    if (result) {
      setData((prevState) =>
        prevState.filter((item) => item.id !== itemIdToDelete)
      );
    }
  }
  const deleteBulkInfoHandler = async () => {
    // a variable from react table library
    const bulkId = selectedFlatRows.map((row) => row.original.id);
    console.log(bulkId);

    const result = await confirm(
      "Bạn có chắc chắn muốn xóa các người dùng này?",
      confirmBoxOptions
    );
    if (result) {
      setData((prevState) => {
        return prevState.filter((item) => !bulkId.includes(item.id));
      });
    }
  };
  const tableInstance = useTable(
    { columns, data },

    useGlobalFilter,
    useGroupBy,
    useSortBy,
    useExpanded,
    usePagination,
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
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageCount,
    setPageSize,

    prepareRow,
    state,
    setGlobalFilter,
    selectedFlatRows,
  } = tableInstance;
  const { globalFilter, pageIndex, pageSize } = state;
  const headers = [
    { label: "Id người dùng", key: "id" },
    { label: "Tên người dùng", key: "name" },
    { label: "Số điện thoại", key: "phoneNumber" },
    { label: "Địa chỉ mặc định", key: "defaultAddress" },
    { label: "Phân quyền", key: "role" },
    { label: "Tổng tiền đã chi", key: "totalMoneySpent" },
  ];
  return (
    <div className="card">
      <div className="card-header bg-primary">
        <h3 className="card-title">Danh sách người </h3>
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
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            <select
              value={pageSize}
              onChange={(e) => setPageSize(+e.target.value)}
            >
              {[10, 25, 50].map((pageSize) => {
                return (
                  <option key={pageSize} value={pageSize}>
                    Hiện {pageSize} dòng
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <table
          id="customers-table"
          className="table table-bordered table-hover"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    {...column.getHeaderProps()}
                  >
                    {column.render("Header")}{" "}
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
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell, i) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div style={{ textAlign: "right" }}>
          <span>
            Trang <strong>{pageIndex + 1}</strong> / {pageCount}
          </span>
          <button
            className="btn btn-dark"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            <FontAwesomeIcon icon={solid("angle-left")} />
          </button>

          <button
            className="btn btn-dark"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            <FontAwesomeIcon icon={solid("angle-right")} />
          </button>
        </div>
      </div>
      <ModalEditUser
        editingItemId={editingUserId}
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
      />
    </div>
  );
};
export default CardUsersTable;
