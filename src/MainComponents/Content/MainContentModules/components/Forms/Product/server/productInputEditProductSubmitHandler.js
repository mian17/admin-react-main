import transformProductFormData from "./transformProductFormData";
import apiClient from "../../../../../../../api";

export default function productInputEditProductSubmitHandler(
  setError,
  productId,
  navigate
) {
  return async (values) => {
    try {
      const userToken = JSON.parse(localStorage.getItem("personalAccessToken"));
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
        `api/admin/product/${productId}`,
        data,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      console.log(productResponse);
      alert(productResponse.data.message);
      navigate(0);
    } catch (error) {
      // console.log(error);
      // setError(error.response.data.message);
      alert(error.response.data.message);
    }
  };
}
