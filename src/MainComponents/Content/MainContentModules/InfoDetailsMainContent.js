import InfoDetails from "./components/InfoDetails/InfoDetails";
import { useCallback, useEffect, useState } from "react";
import apiClient from "../../../api";

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
    labelDataType: "Lượt đăng ký mới tháng này",
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

  const fetchDashboardInfo = useCallback(async () => {
    try {
      const userToken = JSON.parse(localStorage.getItem("personalAccessToken"));
      await apiClient.get("/sanctum/csrf-cookie");
      const response = await apiClient.get("api/admin/", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });
      // console.log(response.data);
      const transformedData = [];
      for (const property in response.data) {
        transformedData.push(+response.data[property]);
      }
      setData(transformedData);
    } catch (error) {
      console.log(error);
      alert("Không lấy được thông tin cho các danh mục trên dashboard.");
    }
  }, []);

  useEffect(() => {
    fetchDashboardInfo();
  }, [fetchDashboardInfo]);
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
