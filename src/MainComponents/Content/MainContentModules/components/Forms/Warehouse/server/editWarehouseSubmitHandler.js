import WarehouseToServer from "../warehouseForm-utils/WarehouseToServer";
import apiClient from "../../../../../../../api";
import { tokenHeaderConfig } from "../../../../../../../common/utils/api-config";

export default function editWarehouseSubmitHandler(
  editingWarehouseId,
  navigate
) {
  return async (values) => {
    try {
      const { name, address, phoneNumber, email } = values;
      const data = new WarehouseToServer(name, address, phoneNumber, email);
      await apiClient.get("/sanctum/csrf-cookie");

      const response = await apiClient.put(
        `api/admin/warehouse/${editingWarehouseId}`,
        data,
        tokenHeaderConfig
      );
      alert(response.data.message);
      navigate(0);
    } catch (error) {
      alert(error.response.data.message);
    }
  };
}
