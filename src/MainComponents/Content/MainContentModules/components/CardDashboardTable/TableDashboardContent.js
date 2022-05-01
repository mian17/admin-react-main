import styles from "./TableDashboardContent.module.css";

const CardDashboardTable = (props) => {
  return (
    <div className="card">
      <div className="card-header bg-secondary">
        <h3 className="card-title ">{props.title}</h3>
      </div>

      <div className="card-body p-0">
        <table className="table table-striped">
          <tbody>
            <tr>
              <td>{props.tableDataRow0[0]}</td>

              <td className={styles.right}>
                {/* <span className="badge bg-primary">30%</span> */}
                {props.tableDataRow0[1]}
              </td>
            </tr>
            <tr>
              <td>{props.tableDataRow1[0]}</td>
              <td className={styles.right}>
                <span>{props.tableDataRow1[1]}</span>
              </td>
            </tr>
            <tr>
              <td>{props.tableDataRow2[0]}</td>

              <td className={styles.right}>
                <span>{props.tableDataRow1[1]}</span>
              </td>
            </tr>
            <tr>
              <td>{props.tableDataRow2[0]}</td>

              <td className={styles.right}>
                <span>{props.tableDataRow2[1]}</span>
              </td>
            </tr>
            <tr>
              <td>{props.tableDataRow3[0]}</td>

              <td className={styles.right}>
                <span>{props.tableDataRow3[1]}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default CardDashboardTable;
