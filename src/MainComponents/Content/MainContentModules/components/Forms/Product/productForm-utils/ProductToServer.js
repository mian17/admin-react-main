export default class ProductToServer {
  constructor(
    name,
    brand,
    category_id,
    summary,
    desc,
    detail_info,
    SKU,
    mass,
    cost_price,
    price,
    unit,
    status,
    merchant_ids,
    warehouse_ids,
    models
  ) {
    this.name = name;
    this.brand = brand;
    this.category_id = category_id;
    this.summary = summary;
    this.desc = desc;
    this.detail_info = detail_info;
    this.SKU = SKU;
    this.mass = mass;
    this.cost_price = cost_price;
    this.price = price;
    this.unit = unit;
    this.status = status;
    this.merchant_ids = merchant_ids;
    this.warehouse_ids = warehouse_ids;
    this.models = models;
  }
}
