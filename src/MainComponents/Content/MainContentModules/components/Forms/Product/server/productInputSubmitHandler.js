import transformProductFormData from "./transformProductFormData";
import apiClient from "../../../../../../../api";
import { tokenHeaderConfig } from "../../../../../../../common/utils/api-config";

export default function productInputSubmitHandler(setError, navigate) {
  return async (values) => {
    // console.log(values.categoricalInfo);

    try {
      const {
        productName: name,
        productBrand: brand,
        productCategory: category_id,
        productSummary: summary,
        productDescription: desc,
        productDetailInfo: detail_info,
        productSku: SKU,
        productMass: mass,
        productCostPrice: cost_price,
        productPrice: price,
        productUnit: unit,
        productStatus: status,
        productMerchant: merchant_ids,
        productWarehouse: warehouse_ids,
        categoricalInfo: models,
      } = values;

      const data = transformProductFormData(
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
      );

      await apiClient.get("/sanctum/csrf-cookie");

      const productResponse = await apiClient.post(
        "api/admin/product",
        data,
        tokenHeaderConfig
      );

      alert(productResponse.data.message);
      navigate(0);
    } catch (error) {
      // setError(error.response.data.message);
      alert(error.response.data.message);
    }
  };
}