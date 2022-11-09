import apiClient from "../../../../../../../api";
import transformCategoryInputsFormData from "../categoryForm-utils/transformCategoryInputsFormData";

export default function categoryInputsSubmitHandler(
  navigate,
  categoryId = null,
  setMessage
) {
  return async (values) => {
    const userToken = JSON.parse(localStorage.getItem("personalAccessToken"));
    const { name, parentCategory, image } = values;

    const data = transformCategoryInputsFormData(name, parentCategory, image);

    try {
      await apiClient.get("/sanctum/csrf-cookie");
      const response = await apiClient.post(
        `api/admin/category/${categoryId === null ? "" : categoryId}`,
        data,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      alert(response.data.message);
      // setMessage(new Message(true, "success", response.data.message));
      // setTimeout(() => {
      navigate(0);
      // }, MESSAGE_TIMEOUT);
    } catch (error) {
      alert(error.response.data.message);
      // setMessage(new Message(true, "danger", error.response.data.message));
    }
  };
}
