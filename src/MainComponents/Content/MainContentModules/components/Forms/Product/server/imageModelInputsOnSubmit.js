import transformModelImagesFormData from "./transformModelImagesFormData";
import apiClient from "../../../../../../../api";

export default async function imageModelInputsOnSubmit(values, navigate) {
  const { productId, modelId, images } = values;
  const data = transformModelImagesFormData(productId, modelId, images);

  try {
    const userToken = JSON.parse(localStorage.getItem("personalAccessToken"));

    await apiClient.get("/sanctum/csrf-cookie");

    const response = await apiClient.post(
      "api/admin/product-details/models/image-upload",
      data,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    alert(response.data.message);
    navigate(0);
  } catch (error) {
    console.log(error);
    if (error.response.status === 413) {
      alert("Bạn tải lên nhiều hình quá");
    } else {
      alert(error.response.data.message);
    }
    navigate(0);
  }
}
