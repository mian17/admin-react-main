import * as Yup from "yup";
import { phoneRegex, skuRegex, userNameRegex } from "./regex";

export const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Thông tin bạn nhập không đúng định dạng email")
    .trim()
    .required("Bạn cần phải nhập email"),
  password: Yup.string()
    .min(8, "Mật khẩu của bạn ngắn quá")
    .max(64, "Mật khẩu của bạn dài quá")
    .required("Bạn cần phải nhập mật khẩu"),
});

// OLD PRODUCT SCHEMA
// export const ProductSchema = Yup.object().shape({
//   productId: Yup.number().positive().integer(),
//   productName: Yup.string()
//     .min(8, "Dữ liệu cần dài hơn 8 ký tự")
//     .max(50, "Dữ liệu cần ít hơn 50 ký tự")
//     .required("Không để trống tên sản phẩm"),
//
//   productQuantity: Yup.number()
//     .positive("Số lượng sản phẩm phải là số nguyên dương")
//     .integer("Số lượng sản phẩm phải là số nguyên dương")
//     .required("Không để trống số lượng sản phẩm"),
//
//   productPrice: Yup.number()
//     .positive("Đơn giá sản phẩm phải là số nguyên dương")
//     .integer("Đơn giá sản phẩm phải là số nguyên dương")
//     .min(200, "Đơn giá sản phẩm phải trên 200 VNĐ")
//     .required("Không để trống đơn giá sản phẩm"),
//   productColorCode: Yup.string()
//     .matches(colorCodeRegex, "Mã màu cần đúng theo định dạng #F00 hoặc #000000")
//     .required("Không để trống mã màu của sản phẩm"),
//   productCostPrice: Yup.number()
//     .positive("Giá vốn sản phẩm phải là số nguyên dương")
//     .integer("Giá vốn sản phẩm phải là số nguyên dương")
//     .min(200, "Giá vốn sản phẩm phải trên 200 VNĐ")
//     .required("Không để trống giá vốn sản phẩm"),
//   hasCategoricalInputs: Yup.boolean(),
//   categoricalInfo: Yup.array().of(
//     Yup.object().shape({
//       name: Yup.string().required("Kiểu loại cần có tên"),
//       colorCode: Yup.string()
//         .matches(
//           colorCodeRegex,
//           "Mã màu cần đúng theo định dạng #F00 hoặc #000000"
//         )
//         .required("Không để trống mã màu của sản phẩm"),
//     })
//   ),
//   productCategory: Yup.number()
//     .min(0, "Dữ liệu cần là số nguyên dương")
//     .integer("Dữ liệu cần là số nguyên dương")
//     .required("Không để trống tên danh mục"),
//   productStatus: Yup.number()
//     .min(0, "Status hiển thị cần là số nguyên dương")
//     .integer("Status hiển thị cần là số nguyên dương")
//     .lessThan(2, "Giá trị nằm ngoài các giá trị hiển thị")
//     .required("Không để trống giá trị hiển thị"),
//   productMerchant: Yup.number()
//     .min(0, "Dữ liệu cần là số nguyên dương")
//     .integer("Dữ liệu cần là số nguyên dương")
//     .required("Không để trống tên nhà bán"),
//   productBrand: Yup.string()
//     .min(2, "Dữ liệu cần dài hơn 2 ký tự")
//     .max(50, "Dữ liệu cần ít hơn 50 ký tự")
//     .required("Không để trống tên hãng"),
//   productSku: Yup.string()
//     .matches(
//       skuRegex,
//       "Mã SKU của sản phẩm cần có ít nhất 1 chữ số, 1 ký tự và tổng thể là đúng 10 ký tự"
//     )
//     .required("Không để trống mã SKU của sản phẩm"),
//   productMass: Yup.number()
//     .positive("Dữ liệu cần là số nguyên dương")
//     .integer("Dữ liệu cần là số nguyên dương")
//     .required("Không để trống khối lượng của sản phẩm"),
//   productUnit: Yup.number()
//     .min(0, "Dữ liệu cần là số nguyên dương")
//     .integer("Dữ liệu cần là số nguyên dương")
//     .required("Không để trống đơn vị của sản phẩm"),
// });
export const UserSchema = Yup.object().shape({
  userId: Yup.number().min(0).integer(),
  userFullName: Yup.string()
    .min(8, "Dữ liệu cần dài hơn 8 ký tự")
    .max(50, "Dữ liệu cần ít hơn 50 ký tự")
    .trim()
    .required("Không để trống tên người dùng"),
  username: Yup.string()
    .min(8, "Dữ liệu cần dài hơn 8 ký tự")
    .max(64, "Dữ liệu bạn nhập dài quá")
    .lowercase()
    .trim()
    .matches(
      userNameRegex,
      "Tên người dùng không có ký tự đặc biệt, khoảng trống, chữ in hoa"
    )
    .required("Không để trống tên người dùng"),
  userBirthDate: Yup.string()
    .trim()
    .min(7, "Không đúng định dạng ngày")
    .required("Không để trống ngày sinh của người dùng"),
  userGender: Yup.number()
    .integer()
    .min(0)
    .max(2, "Giá trị nằm ngoài lựa chọn")
    .required("Không để trống giới tính của người dùng"),
  userEmail: Yup.string()
    .email("Phải đúng định dạng của email")
    .trim()
    .required("Không để trống email của người dùng"),
  userPhoneNumber: Yup.string()
    .matches(phoneRegex, "Dữ liệu không đúng định dạng của số điện thoại")
    .trim()
    .required("Không để trống số điện thoại của người dùng"),
  userAddresses: Yup.array().of(
    Yup.object().shape({
      id: Yup.string().min(0, "Bạn phá id hả?").trim(),
      receiverName: Yup.string()
        .min(8, "Dữ liệu cần dài hơn 8 ký tự")
        .max(50, "Dữ liệu cần ít hơn 50 ký tự")
        .trim()
        .required("Không để trống tên sản phẩm"),
      address: Yup.string()
        .min(8, "Dữ liệu cần dài hơn 8 ký tự")
        .max(200, "Dữ liệu cần ít hơn 200 ký tự")
        .trim()
        .required("Không để trống tên sản phẩm"),
      phoneNumber: Yup.string()
        .matches(phoneRegex, "Dữ liệu không đúng định dạng của số điện thoại")
        .required("Không để trống số điện thoại của địa chỉ người nhận"),
      addressCategory: Yup.number()
        .min(0)
        .max(1, "Giá trị nằm ngoài lựa chọn")
        .required(),
      defaultAddress: Yup.boolean().required(),
    })
  ),
  userRole: Yup.number()
    .min(0)
    .max(2, "Giá trị nằm ngoài lựa chọn")
    .required("Không để trống giá trị phân quyền của người dùng"),
});
// export const EnterStockSchema = {};
export const ProductSchema = Yup.object().shape({
  productSku: Yup.string()
    .matches(
      skuRegex,
      "Mã SKU của sản phẩm cần có ít nhất 1 chữ số, 1 ký tự và đúng trên 10 ký tự"
    )
    .required("Không để trống mã SKU của sản phẩm"),
  productName: Yup.string()
    .min(8, "Dữ liệu cần dài hơn 8 ký tự")
    .max(50, "Dữ liệu cần ít hơn 50 ký tự")
    .required("Không để trống tên sản phẩm"),

  productCategory: Yup.number()
    .min(1, "Dữ liệu cần là số nguyên dương")
    .integer("Dữ liệu cần là số nguyên dương")
    .required("Không để trống tên danh mục"),

  productPrice: Yup.number()
    .positive("Đơn giá sản phẩm phải là số nguyên dương")
    .integer("Đơn giá sản phẩm phải là số nguyên dương")
    .min(200, "Đơn giá sản phẩm phải trên 200 VNĐ")
    .required("Không để trống đơn giá sản phẩm"),
  productCostPrice: Yup.number()
    .positive("Giá vốn sản phẩm phải là số nguyên dương")
    .integer("Giá vốn sản phẩm phải là số nguyên dương")
    .min(200, "Giá vốn sản phẩm phải trên 200 VNĐ")
    .required("Không để trống giá vốn sản phẩm"),
  productBrand: Yup.string()
    .min(2, "Dữ liệu cần dài hơn 2 ký tự")
    .max(50, "Dữ liệu cần ít hơn 50 ký tự")
    .required("Không để trống tên hãng"),
  productMass: Yup.number()
    .positive("Dữ liệu cần là số nguyên dương")
    .integer("Dữ liệu cần là số nguyên dương")
    .required("Không để trống khối lượng của sản phẩm"),
  productUnit: Yup.string()
    .min(1, "Tên đơn vị nằm ngoài lựa chọn")
    .max(2, "Tên đơn vị nằm ngoài lựa chọn")
    .required("Không để trống tên đơn vị khối lượng của sản phẩm"),
  productStatus: Yup.string()
    .matches(/^(Ẩn|Hiển thị)$/, "Giá trị hiển thị nằm ngoài lựa chọn")
    .required("Không để trống giá trị hiển thị"),
  productMerchant: Yup.array()
    .of(
      Yup.number()
        .min(1, "Sai dữ liệu")
        .integer("Sai dữ liệu")
        .required("Không để trống nhà bán")
    )
    .min(1, "Bạn cần chọn nhà bán"),
  productWarehouse: Yup.array()
    .of(
      Yup.number()
        .min(1, "Sai dữ liệu")
        .integer("Sai dữ liệu")
        .required("Không để trống nhà kho")
    )
    .min(1, "Bạn cần chọn kho"),

  productSummary: Yup.string()
    .min(1, "Nội dung tóm tắt ngắn quá")
    .max(255, "Nội dung tóm tắt dài quá")
    .required("Bạn cần phải nhập nội dung tóm tắt cho sản phẩm"),
  productDescription: Yup.string()
    .min(1, "Nội dung miêu tả sản phẩm ngắn quá")
    .max(1024, "Nội dung miêu tả sản phẩm dài quá")
    .required("Bạn cần phải nhập nội dung miêu tả cho sản phẩm"),
  productDetailInfo: Yup.string()
    .min(1, "Nội dung chi tiết sản phẩm ngắn quá")
    .max(1024, "Nội dung chi tiết sản phẩm dài quá")
    .required("Bạn cần phải nhập nội dung chi tiết cho sản phẩm"),
  // productColorCode: Yup.string()
  //   .matches(colorCodeRegex, "Mã màu cần đúng theo định dạng #F00 hoặc #000000")
  //   .required("Không để trống mã màu của sản phẩm"),
  // hasCategoricalInputs: Yup.boolean(),
  // categoricalInfo: Yup.array()
  //   .of(
  //     Yup.object().shape({
  //       name: Yup.string().required("Kiểu loại cần có tên"),
  //       colorCode: Yup.string()
  //         .matches(
  //           colorCodeRegex,
  //           "Mã màu cần đúng theo định dạng #F00 hoặc #000000"
  //         )
  //         .required("Không để trống mã màu của sản phẩm"),
  //       imageOneUrl: Yup.string().required(
  //         "Bạn cần thêm hình cover cho sản phẩm"
  //       ),
  //       quantity: Yup.number()
  //         .min(1, "Số lượng sản phẩm cho kiểu mẫu phải ít nhất là 1")
  //         .required("Bạn cần thêm số lượng sản phẩm cho kiểu mẫu"),
  //       imageTwoUrl: Yup.string(),
  //     })
  //   )
  //   .min(1, "Phải có ít nhất 1 kiểu loại"),
});

export const CategorySchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Tên danh mục mới ngắn quá")
    .max(255, "Tên danh mục mới dài quá")
    .required("Bạn cần nhập tên danh mục mới mà bạn cần thêm"),
});

export const OrderSchema = Yup.object().shape({
  receiverName: Yup.string()
    .min(2, "Tên người nhận ngắn quá")
    .max(255, "Tên người nhận dài quá")
    .required("Bạn cần nhập tên của người nhận"),
  receiverAddress: Yup.string()
    .min(2, "Thông tin địa chỉ ngắn quá")
    .max(255, "Thông tin địa chỉ dài quá")
    .required("Bạn cần nhập thông tin địa chỉ của người nhận"),
  receiverPhoneNumber: Yup.string()
    .matches(phoneRegex, "Dữ liệu không đúng định dạng của số điện thoại")
    .trim()
    .required("Bạn cần nhập số điện thoại của người nhận"),
  receiverEmail: Yup.string()
    .email("Thông tin bạn nhập không đúng định dạng email")
    .trim()
    .required("Bạn cần phải nhập email của người nhận"),
});

export const WarehouseSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Tên nhà kho ngắn quá")
    .max(255, "Tên nhà kho dài quá")
    .required("Bạn cần nhập tên nhà kho"),
  address: Yup.string()
    .min(2, "Thông tin địa chỉ ngắn quá")
    .max(255, "Thông tin địa chỉ dài quá")
    .required("Bạn cần nhập thông tin địa chỉ"),
  phoneNumber: Yup.string()
    .matches(phoneRegex, "Dữ liệu không đúng định dạng của số điện thoại")
    .trim()
    .required("Bạn cần nhập số điện thoại của nhà kho"),
  email: Yup.string()
    .email("Thông tin bạn nhập không đúng định dạng email")
    .trim()
    .required("Bạn cần phải nhập email của nhà kho"),
});

export const MerchantSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Tên nhà bán ngắn quá")
    .max(255, "Tên nhà bán dài quá")
    .required("Bạn cần nhập tên nhà bán"),
  address: Yup.string()
    .min(2, "Thông tin địa chỉ ngắn quá")
    .max(255, "Thông tin địa chỉ dài quá")
    .required("Bạn cần nhập thông tin địa chỉ"),
  phoneNumber: Yup.string()
    .matches(phoneRegex, "Dữ liệu không đúng định dạng của số điện thoại")
    .trim()
    .required("Bạn cần nhập số điện thoại của nhà kho"),
  email: Yup.string()
    .email("Thông tin bạn nhập không đúng định dạng email")
    .trim()
    .required("Bạn cần phải nhập email của nhà bán"),
});
