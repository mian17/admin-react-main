// import React, {useEffect, useRef} from "react"
// import $ from 'jquery'


// const CardProductsTable = () => {
    // Ten san pham, Ma san pham, SL, Gia ban, Danh muc, Nha san xuat
    // $.DataTable = require('datatables.net');
    //
    // const tableRef = useRef();
    //
    // useEffect(() => {
    //
    //     console.log(tableRef.current)
    //     const table = $(tableRef.current).DataTable(
    //         {
    //             "responsive": true, "lengthChange": false, "autoWidth": false,
    //             "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
    //         })
    //
    //     return function () {
    //         console.log("Table destroyed")
    //         table.destroy()
    //     }
    //
    // }, [])
    //
    // return (
    //     <div className="card">
    //         <div className="card-header bg-primary">
    //             <h3 className="card-title">Danh sách sản phẩm</h3>
    //         </div>
    //
    //         <div className="card-body">
    //             <table ref={tableRef} className="table table-bordered table-hover">
    //                 <thead>
    //                 <tr>
    //                     <th>Tên sản phẩm</th>
    //                     <th>Mã sản phẩm</th>
    //                     <th>SL</th>
    //                     <th>Giá bán</th>
    //                     <th>Danh mục</th>
    //                     <th>Nhà sản xuất</th>
    //                     <th>Tính năng</th>
    //                 </tr>
    //                 </thead>
    //                 <tbody>
    //                 <tr>
    //                     <td>APhone 14</td>
    //                     <td>000</td>
    //                     <td>0</td>
    //                     <td>0 VNĐ</td>
    //                     <td>Điện thoại</td>
    //                     <td>Ipple</td>
    //                     <td>Xóa</td>
    //                 </tr>
    //                 </tbody>
    //                 <tfoot>
    //                 <tr>
    //                     <th>Tên sản phẩm</th>
    //                     <th>Mã sản phẩm</th>
    //                     <th>SL</th>
    //                     <th>Giá bán</th>
    //                     <th>Danh mục</th>
    //                     <th>Nhà sản xuất</th>
    //                     <th>Tính năng</th>
    //                 </tr>
    //                 </tfoot>
    //             </table>
    //         </div>
    //     </div>
    // );


// };
// export default CardProductsTable;
