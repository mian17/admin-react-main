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

    this.categoricalInfo = categoricalInfo;
  }
}
