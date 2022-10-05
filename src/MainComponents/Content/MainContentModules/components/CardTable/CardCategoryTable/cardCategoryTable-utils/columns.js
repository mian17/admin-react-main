// export const COLUMNS = [
//   {
//     Header: "Id",
//     accessor: "id",
//   },
//   {
//     Header: "Hình ảnh",
//     accessor: "img",
//     Cell: ({ cell: { value } }) => {
//       return (
//         <div className={classes["category-img"]}>
//           <img className={classes["category-img"]} src={value} alt="" />
//         </div>
//       );
//     },
//   },
//   {
//     Header: "Tên danh mục",
//     accessor: "name",
//   },
//   {
//     Header: "Danh mục cha",
//     accessor: "parentCategory",
//   },
//   // {
//   //   Header: "Nhà bán",
//   //   accessor: "merchant",
//   // },
//   {
//     Header: "Chức năng",
//     accessor: "functions",
//
//     Cell: ({ cell }) => {
//       const rowValues = cell.row.values;
//       const rowItemId = cell.row.values.id; // id from ProductInCart.js constructor
//       // const rowItemId = row.index; // id from ProductInCart.js constructor
//       return (
//         <div>
//           <button className="btn btn-warning">
//             <FontAwesomeIcon icon={solid("pen-to-square")} />
//           </button>
//           <button
//             className="btn btn-danger"
//             onClick={() => {
//               const result = window.confirm(
//                 "Bạn có muốn đưa sản phẩm này vào thùng rác không?"
//               );
//             }}
//           >
//             <FontAwesomeIcon icon={solid("trash-can")} />
//           </button>
//         </div>
//       );
//     },
//   },
// ];
