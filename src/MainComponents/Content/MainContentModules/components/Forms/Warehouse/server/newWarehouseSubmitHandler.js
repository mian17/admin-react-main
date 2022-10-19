import WarehouseToServer from "../warehouseForm-utils/WarehouseToServer";
import apiClient from "../../../../../../../api";
import { tokenHeaderConfig } from "../../../../../../../common/utils/api-config";
import Warehouse from "../warehouseForm-utils/Warehouse";

export default function newWarehouseSubmitHandler(navigate) {
  return async (values, actions) => {
    try {
      const { name, address, phoneNumber, email } = values;
      const data = new WarehouseToServer(name, address, phoneNumber, email);
      await apiClient.get("/sanctum/csrf-cookie");

      const response = await apiClient.post(
        "api/admin/warehouse",
        data,
        tokenHeaderConfig
      );

      alert(response.data.message);
      navigate(0);
      actions.resetForm({ values: new Warehouse("", "", "", "") });
    } catch (error) {
      alert(error.response.data.message);
    }
  };
}
