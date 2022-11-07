import {useCallback, useState} from "react";
import apiClient from "../api";

// functionToProcess parameter must RETURN something
const useFetchingTableData = (apiUrl, setData, functionToProcess) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [noFoundSearchResult, setNoFoundSearchResult] = useState(false);

  const fetchData = useCallback(async () => {
    setNoFoundSearchResult(false);
    setIsLoading(true);
    setData([]);

    try {
      const userToken = JSON.parse(localStorage.getItem("personalAccessToken"));
      await apiClient.get("/sanctum/csrf-cookie");
      const response = await apiClient.get(`${apiUrl}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });
      const transformedData = functionToProcess(response);
      setData(transformedData);
    } catch (error) {
      console.log(error);
      setHasError(true);
      // alert("Đã có lỗi xảy ra trong quá trình tải các danh mục.");
    }
    setIsLoading(false);
  }, [apiUrl, setData]);

  return {
    isLoading,
    setIsLoading,
    hasError,
    setHasError,
    noFoundSearchResult,
    setNoFoundSearchResult,
    fetchData,
  };
};
export default useFetchingTableData;
