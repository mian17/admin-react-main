import classes from "../../MainComponents/Content/MainContentModules/components/CardTable/CardCategoryTable/CardCategoryTable.module.css";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const ReactTable = ({
  getTableProps,
  headerGroups,
  getTableBodyProps,
  rows,
  prepareRow,
  isLoading,
  hasError,
  noFoundSearchResult,
  colSpan = 6,
  emptyMessage,
  filter = "",
  enableSort = false,
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
                {...column.getHeaderProps(
                  enableSort && column.getSortByToggleProps()
                )}
              >
                {column.render("Header")}
                {enableSort && (
                  <span>
                    {" "}
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
                )}
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
        {noFoundSearchResult && filter.length > 0 && (
          <tr>
            <td style={{ textAlign: "center" }} colSpan={colSpan}>
              Không tìm thấy thông tin nào theo đúng nhu cầu của bạn.
            </td>
          </tr>
        )}
        {rows.length === 0 && filter.length === 0 && !isLoading && !hasError && (
          <tr>
            <td style={{ textAlign: "center" }} colSpan={colSpan}>
              {emptyMessage}
            </td>
          </tr>
        )}
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
  );
};
export default ReactTable;
