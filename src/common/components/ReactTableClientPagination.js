import { Table } from "react-bootstrap";
import classes from "../../MainComponents/Content/MainContentModules/components/CardTable/CardCategoryTable/CardCategoryTable.module.css";

const ReactTableClientPagination = ({
  getTableProps,
  headerGroups,
  getTableBodyProps,
  page,
  prepareRow,
  isLoading,
  hasError,
  noFoundSearchResult,
  colSpan = 6,
  emptyMessage,

  filter = "",
}) => {
  return (
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
        {isLoading && (
          <tr>
            <td style={{ textAlign: "center" }} colSpan={colSpan}>
              Đang tải thông tin...
            </td>
          </tr>
        )}
        {hasError && (
          <tr>
            <td style={{ textAlign: "center" }} colSpan={colSpan}>
              Đã có lỗi xảy ra
            </td>
          </tr>
        )}
        {page.length === 0 && filter.length > 0 && (
          <tr>
            <td style={{ textAlign: "center" }} colSpan={colSpan}>
              Không tìm thấy thông tin nào theo đúng nhu cầu của bạn.
            </td>
          </tr>
        )}
        {/*{page.length === 0 && filter.length === 0 && !isLoading && !hasError && (*/}
        {/*  <tr>*/}
        {/*    <td style={{ textAlign: "center" }} colSpan={colSpan}>*/}
        {/*      {emptyMessage}*/}
        {/*    </td>*/}
        {/*  </tr>*/}
        {/*)}*/}
        {page.map((row) => {
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
  );
};
export default ReactTableClientPagination;
