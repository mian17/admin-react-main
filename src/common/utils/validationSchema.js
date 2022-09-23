import * as Yup from "yup";
import { colorCodeRegex, phoneRegex, skuRegex, userNameRegex } from "./regex";

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

export const ProductSchema = Yup.object().shape({
  productId: Yup.number().positive().integer(),
  productName: Yup.string()
    .min(8, "Dữ liệu cần dài hơn 8 ký tự")
    .max(50, "Dữ liệu cần ít hơn 50 ký tự")
    .required("Không để trống tên sản phẩm"),

  productQuantity: Yup.number()
    .positive("Số lượng sản phẩm phải là số nguyên dương")
    .integer("Số lượng sản phẩm phải là số nguyên dương")
    .required("Không để trống số lượng sản phẩm"),

  productPrice: Yup.number()
    .positive("Đơn giá sản phẩm phải là số nguyên dương")
    .integer("Đơn giá sản phẩm phải là số nguyên dương")
    .min(200, "Đơn giá sản phẩm phải trên 200 VNĐ")
    .required("Không để trống đơn giá sản phẩm"),
  productColorCode: Yup.string()
    .matches(colorCodeRegex, "Mã màu cần đúng theo định dạng #F00 hoặc #000000")
    .required("Không để trống mã màu của sản phẩm"),
  productCostPrice: Yup.number()
    .positive("Giá vốn sản phẩm phải là số nguyên dương")
    .integer("Giá vốn sản phẩm phải là số nguyên dương")
    .min(200, "Giá vốn sản phẩm phải trên 200 VNĐ")
    .required("Không để trống giá vốn sản phẩm"),
  hasCategoricalInputs: Yup.boolean(),
  categoricalInfo: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Kiểu loại cần có tên"),
      colorCode: Yup.string()
        .matches(
          colorCodeRegex,
          "Mã màu cần đúng theo định dạng #F00 hoặc #000000"
        )
        .required("Không để trống mã màu của sản phẩm"),
    })
  ),
  productCategory: Yup.number()
    .min(0, "Dữ liệu cần là số nguyên dương")
    .integer("Dữ liệu cần là số nguyên dương")
    .required("Không để trống tên danh mục"),
  productStatus: Yup.number()
    .min(0, "Status hiển thị cần là số nguyên dương")
    .integer("Status hiển thị cần là số nguyên dương")
    .lessThan(2, "Giá trị nằm ngoài các giá trị hiển thị")
    .required("Không để trống giá trị hiển thị"),
  productMerchant: Yup.number()
    .min(0, "Dữ liệu cần là số nguyên dương")
    .integer("Dữ liệu cần là số nguyên dương")
    .required("Không để trống tên nhà bán"),
  productBrand: Yup.string()
    .min(2, "Dữ liệu cần dài hơn 2 ký tự")
    .max(50, "Dữ liệu cần ít hơn 50 ký tự")
    .required("Không để trống tên hãng"),
  productSku: Yup.string()
    .matches(
      skuRegex,
      "Mã SKU của sản phẩm cần có ít nhất 1 chữ số, 1 ký tự và tổng thể là đúng 10 ký tự"
    )
    .required("Không để trống mã SKU của sản phẩm"),
  productMass: Yup.number()
    .positive("Dữ liệu cần là số nguyên dương")
    .integer("Dữ liệu cần là số nguyên dương")
    .required("Không để trống khối lượng của sản phẩm"),
  productUnit: Yup.number()
    .min(0, "Dữ liệu cần là số nguyên dương")
    .integer("Dữ liệu cần là số nguyên dương")
    .required("Không để trống đơn vị của sản phẩm"),
});
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
export const EnterStockSchema = {};