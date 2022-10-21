import { Bar } from "react-chartjs-2";
import React, { useCallback, useEffect, useState } from "react";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { makeYears } from "../../../../../common/utils/helperFunctions";
import apiClient from "../../../../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labels = [
  "Tháng 1",
  "Tháng 2",
  "Tháng 3",
  "Tháng 4",
  "Tháng 5",
  "Tháng 6",
  "Tháng 7",
  "Tháng 8",
  "Tháng 9",
  "Tháng 10",
  "Tháng 11",
  "Tháng 12",
];

const OrderCountChart = () => {
  const [data, setData] = useState({
    labels,
    datasets: [
      {
        label: "Số đơn hàng bán theo tháng",
        data: [],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  });
  const createdYear = 2022;
  const [selectedYear, setSelectedYear] = useState(createdYear);

  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const [years, setYears] = useState(makeYears(currentYear));

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Số đơn hàng trong năm ${selectedYear}`,
      },
    },
  };

  const selectedYearOnChangeHandler = (e) => {
    console.log(e.target.value);
    setSelectedYear(+e.target.value);
  };

  const getOrdersCountSelectedYear = useCallback(async () => {
    try {
      const userToken = JSON.parse(localStorage.getItem("personalAccessToken"));
      await apiClient.get("/sanctum/csrf-cookie");
      const response = await apiClient.post(
        `api/admin/chart-analysis-order-count`,
        { year: selectedYear },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      setData({
        labels,
        datasets: [
          {
            label: "Số đơn hàng",
            data: response.data,
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  }, [selectedYear]);

  useEffect(() => {
    getOrdersCountSelectedYear();
  }, [getOrdersCountSelectedYear]);
  return (
    <>
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <FontAwesomeIcon icon={solid("shop")} /> Số đơn hàng
          </div>
          <div className="card-tools">
            <span>
              <strong>Năm</strong>:{" "}
            </span>
            <select value={currentYear} onChange={selectedYearOnChangeHandler}>
              <option value={createdYear}>{createdYear}</option>
              {years.map((year, index) => {
                return (
                  <option key={index} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="card-body">
          <Bar options={options} data={data} />
        </div>
      </div>
    </>
  );
};
export default OrderCountChart;
