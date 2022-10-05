import transformModelImagesFormData from "./transformModelImagesFormData";
import apiClient from "../../../../../../../api";
import { tokenHeaderConfig } from "../../../../../../../common/utils/api-config";

export default async function imageModelInputsOnSubmit(values, navigate) {
  const { productId, modelId, images } = values;
  const data = transformModelImagesFormData(productId, modelId, images);

  try {
    await apiClient.get("/sanctum/csrf-cookie");

    const response = await apiClient.post(
      "api/admin/product-details/models/image-upload",
      data,
      tokenHeaderConfig
    );
    alert(response.data.message);
    navigate(0);
  } catch (error) {
    alert(error.data.message);
  }
}
