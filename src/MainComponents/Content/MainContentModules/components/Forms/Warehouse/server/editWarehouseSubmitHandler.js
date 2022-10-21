import WarehouseToServer from "../warehouseForm-utils/WarehouseToServer";
import apiClient from "../../../../../../../api";

export default function editWarehouseSubmitHandler(
  editingWarehouseId,
  navigate
) {
  return async (values) => {
    try {
      const userToken = JSON.parse(localStorage.getItem("personalAccessToken"));

      const { name, address, phoneNumber, email } = values;
      const data = new WarehouseToServer(name, address, phoneNumber, email);
      await apiClient.get("/sanctum/csrf-cookie");

      const response = await apiClient.put(
        `api/admin/warehouse/${editingWarehouseId}`,
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
