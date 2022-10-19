import InfoDetails from "./components/InfoDetails/InfoDetails";
import { useCallback, useEffect, useState } from "react";
import apiClient from "../../../api";
import { tokenHeaderConfig } from "../../../common/utils/api-config";

const infoDetailsConfig = [
  {
    // id: 0,
    // num: 150,
    // unit: "",
    labelDataType: "Đơn hàng mới hôm nay",
    icon: "fas fa-shopping-bag",
    bootstrapBackground: "bg-info",
  },
  {
    // id: 1,
    // num: 53,
    // unit: "%",
    labelDataType: "Tổng doanh thu tháng này",
    icon: "far fa-chart-bar",
    bootstrapBackground: "bg-success",
  },
  {
    // id: 2,
    // num: 150,
    // unit: "",
    labelDataType: "Lượt đăng ký mới",
    icon: "fas fa-user-plus",
    bootstrapBackground: "bg-warning",
  },
  {
    // id: 3,
    // num: 65,
    // unit: "",
    labelDataType: "Số sản phẩm",
    icon: "fas fa-box",
    bootstrapBackground: "bg-danger",
  },
];

const InfoDetailsMainContent = () => {
  const [data, setData] = useState([]);

  const fetchDasboardInfo = useCallback(async () => {
    try {
      await apiClient.get("/sanctum/csrf-cookie");
      const response = await apiClient.get("api/admin/", tokenHeaderConfig);
      // console.log(response.data);
      const transformedData = [];
      for (const property in response.data) {
        transformedData.push(+response.data[property]);
      }
      setData(transformedData);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchDasboardInfo();
  }, [fetchDasboardInfo]);
  return (
    <div className="row">
      {infoDetailsConfig.map((info, index) => (
        <InfoDetails
          key={index}
          num={data[index]}
          labelDataType={info.labelDataType}
          icon={info.icon}
          bootstrapBackground={info.bootstrapBackground}
        />
      ))}
    </div>
  );
};
export default InfoDetailsMainContent;
