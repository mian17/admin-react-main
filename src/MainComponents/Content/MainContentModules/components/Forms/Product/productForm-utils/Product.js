export default class Product {
  constructor(
    productSku,
    productName,
    productCategory,

    productPrice,
    productCostPrice,

    productBrand,
    productMass,
    productUnit,

    productStatus,
    productMerchant,
    productWarehouse,

    productSummary,
    productDescription,
    productDetailInfo,

    // productColorCode,
    // hasCategoricalInputs,
    categoricalInfo
  ) {
    this.productSku = productSku;
    this.productName = productName;
    this.productCategory = productCategory;

    this.productPrice = productPrice;
    this.productCostPrice = productCostPrice;
    this.productBrand = productBrand;
    this.productMass = productMass;
    this.productUnit = productUnit;

    this.productStatus = productStatus;
    this.productMerchant = productMerchant;
    this.productWarehouse = productWarehouse;

    this.productSummary = productSummary;
    this.productDescription = productDescription;
    this.productDetailInfo = productDetailInfo;

    // this.productColorCode = productColorCode;
    // this.hasCategoricalInputs = hasCategoricalInputs;
    this.categoricalInfo = categoricalInfo;
  }
}
// {
//     productId: "",
//         productName: "",
//     productQuantity: 0,
//     productPrice: 0,
//     productColorCode: "",
//     productCostPrice: 0,
//     hasCategoricalInputs: false,
//     categoricalInfo: [],
//     productCategory: 0,
//     productStatus: 0,
//     productMerchant: 0,
//     productBrand: "",
//     productSku: "",
//     productMass: 0,
//     productUnit: 0,
//     productWarehouse: 0,
// }
