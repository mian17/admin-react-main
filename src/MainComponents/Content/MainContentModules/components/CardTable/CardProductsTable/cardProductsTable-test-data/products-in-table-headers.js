// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
// import { confirm } from "react-confirm-box";
// import { confirmBoxOptions } from "../../../../../../../common/utils/options";
//
// export const productsInTableHeaders = [
//   {
//     Header: "Mã sản phẩm",
//     accessor: "id", // accessor is the "key" in the data
//   },
//   {
//     Header: "Tên sản phẩm",
//     accessor: "name",
//   },
//   {
//     Header: "Số lượng",
//     accessor: "quantity",
//   },
//   {
//     Header: "Đơn giá",
//     accessor: "price",
//   },
//
//   {
//     Header: "Danh mục",
//     accessor: "category",
//   },
//   {
//     Header: "Trạng thái",
//     accessor: "status",
//   },
//   {
//     Header: "Nhà bán",
//     accessor: "merchant",
//   },
//   {
//     Header: "Chức năng",
//     accessor: "functions",
//     Cell: ({ cell }) => (
//       <div>
//         <button
//           className="btn btn-success"
//           onClick={() => copyInfoHandler(cell.row.values)}
//         >
//           <FontAwesomeIcon icon={solid("copy")} />
//         </button>
//         <button
//           className="btn btn-warning"
//           onClick={() => editInfoHandler(cell.row.values.id)}
//         >
//           <FontAwesomeIcon icon={solid("pen-to-square")} />
//         </button>
//         <button
//           className="btn btn-danger"
//           onClick={() => deleteInfoHandler(cell.row.values.id)}
//         >
//           <FontAwesomeIcon icon={solid("trash-can")} />
//         </button>
//         <button
//           type="button"
//           className="btn btn-primary"
//           data-toggle="modal"
//           data-target="#exampleModal"
//         >
//           Launch demo modal
//         </button>
//       </div>
//     ),
//   },
// ];
//
// function copyInfoHandler(valueObj) {
//   let readyForClipboard = "";
//
//   for (const property in valueObj) {
//     if (property === "functions") continue;
//     readyForClipboard += `${valueObj[property]}\t`;
//   }
//   console.log(readyForClipboard);
//   navigator.clipboard.writeText(readyForClipboard).then(() => {
//     alert("Đã copy nội dung hàng của bảng!");
//   });
// }
// function editInfoHandler(productId) {
//   console.log(productId);
// }
// function deleteInfoHandler(productId) {
//   // console.log(productId);
//   const dataCopy = [...data];
// }
