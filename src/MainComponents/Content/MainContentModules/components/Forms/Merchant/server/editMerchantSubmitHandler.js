import apiClient from "../../../../../../../api";
import MerchantToServer from "../merchantForm-utils/MerchantToServer";

export default function editMerchantSubmitHandler(editingMerchantId, navigate) {
  return async (values) => {
    try {
      const userToken = JSON.parse(localStorage.getItem("personalAccessToken"));

      const { name, address, phoneNumber, email } = values;
      const data = new MerchantToServer(name, address, phoneNumber, email);
      await apiClient.get("/sanctum/csrf-cookie");

      const response = await apiClient.put(
        `api/admin/merchant/${editingMerchantId}`,
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
      alert(error.response.data.message);
    }
  };
}
