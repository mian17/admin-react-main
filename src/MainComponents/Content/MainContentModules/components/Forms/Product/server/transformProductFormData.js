export default function transformProductFormData(
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
  const data = new FormData();
  data.append("name", name);
  data.append("brand", brand);
  data.append("category_id", category_id);
  data.append("summary", summary);
  data.append("desc", desc);
  data.append("detail_info", detail_info);
  data.append("SKU", SKU);
  data.append("mass", mass);
  data.append("cost_price", cost_price);
  data.append("price", price);
  data.append("unit", unit);
  data.append("status", status);
  data.append("merchant_ids", JSON.stringify(merchant_ids));
  data.append("warehouse_ids", JSON.stringify(warehouse_ids));

  models.forEach((model, i) => {
    for (const property in model) {
      if (property === "imageOneUrl") {
        data.append(`models[${i}][image_1]`, model[property]);
        continue;
      }
      if (property === "colorCode") {
        data.append(`models[${i}][hex_color]`, model[property]);
        continue;
      }

      if (property === "imageTwoUrl") {
        // if (
        //   model[property] !== undefined ||
        //   model[property] !== null ||
        //   model[property].length !== 0
        // ) {
        data.append(`models[${i}][image_2]`, model[property]);
        // } else {
        //   data.append(`models[${i}][image_2]`, "");
        // }
        continue;
      }

      if (property !== "imageTwoUrl") {
        data.append(`models[${i}][${property}]`, model[property]);
      }
    }
  });
  return data;
}
